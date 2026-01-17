<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class PanelWidget extends StatsOverviewWidget
{
    protected static ?int $sort = 1;
    protected function getStats(): array
    {
        $currentStock = Product::sum('stock');
        $previousStock = Product::whereDate('created_at', '<=', now()->subMonth())->sum('stock');
        [$stockDescription, $stockIcon, $stockColor] = $this->trend($currentStock, $previousStock);

        $currentOrders = Order::count();
        $previousOrders = Order::whereDate('created_at', '<=', now()->subMonth())->count();
        [$ordersDescription, $ordersIcon, $ordersColor] = $this->trend($currentOrders, $previousOrders);

        $totalCost = Product::sum(DB::raw('buy_price * stock'));
        $totalRevenue = Order::where('status', 'paid')->sum('total_price');
        $totalProfit = $totalRevenue - $totalCost;
        [$profitDescription, $profitIcon, $profitColor] = $this->trend($totalProfit, 0);

        $previousRevenue = Order::where('status', 'paid')
            ->whereDate('created_at', '<=', now()->subMonth())
            ->sum('total_price');
        [$revenueDescription, $revenueIcon, $revenueColor] = $this->trend($totalRevenue, $previousRevenue);

        return [
            Stat::make('Total Products Count', $currentStock)
                ->description($stockDescription)
                ->descriptionIcon($stockIcon)
                ->color($stockColor),

            Stat::make('Total Orders', $currentOrders)
                ->description($ordersDescription)
                ->descriptionIcon($ordersIcon)
                ->color($ordersColor),

            Stat::make('Revenue from orders', number_format($totalRevenue, 2))
                ->description($revenueDescription)
                ->descriptionIcon($revenueIcon)
                ->color($revenueColor),

            Stat::make('Total Profit', number_format($totalProfit, 2))
                ->description($profitDescription)
                ->descriptionIcon($profitIcon)
                ->color($profitColor),
        ];
    }

    private function trend(float|int $current, float|int $previous): array
    {
        return match (true) {
            $current > $previous => [
                'Increased vs last month',
                Heroicon::ArrowTrendingUp,
                'success'
            ],
            $current < $previous => [
                'Decreased vs last month',
                Heroicon::ArrowTrendingDown,
                'danger'
            ],
            default => [
                'No changes',
                Heroicon::Minus,
                'gray'
            ],
        };
    }
}
