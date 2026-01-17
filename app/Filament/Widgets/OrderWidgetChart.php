<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;

class OrderWidgetChart extends ChartWidget
{
    protected ?string $heading = 'Orders per Month (Paid)';

    protected static ?int $sort = 2;

    public ?string $filter = null;

    protected function getFilters(): ?array
    {
        $years = Order::selectRaw("DISTINCT YEAR(created_at) as year")
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->mapWithKeys(fn($year) => [$year => $year])
            ->toArray();

        $filters = [];

        foreach ($years as $year) {
            $filters["{$year}-all"] = "{$year} - All months";
            $filters["{$year}-01"] = "{$year} - January";
            $filters["{$year}-02"] = "{$year} - February";
            $filters["{$year}-03"] = "{$year} - March";
            $filters["{$year}-04"] = "{$year} - April";
            $filters["{$year}-05"] = "{$year} - May";
            $filters["{$year}-06"] = "{$year} - June";
            $filters["{$year}-07"] = "{$year} - July";
            $filters["{$year}-08"] = "{$year} - August";
            $filters["{$year}-09"] = "{$year} - September";
            $filters["{$year}-10"] = "{$year} - October";
            $filters["{$year}-11"] = "{$year} - November";
            $filters["{$year}-12"] = "{$year} - December";
        }

        return $filters ?: [now()->year . '-all' => now()->year . ' - All months'];
    }

    protected function getData(): array
    {
        if (!$this->filter || !str_contains($this->filter, '-')) {
            $this->filter = now()->year . '-all';
        }

        $filterParts = explode('-', $this->filter ?? (now()->year . '-all'));
        $year = $filterParts[0] ?? now()->year;
        $monthFilter = $filterParts[1] ?? 'all';

        $query = Order::query()
            ->where('status', 'paid')
            ->whereYear('created_at', $year);

        if ($monthFilter && $monthFilter !== 'all') {
            $query->whereMonth('created_at', $monthFilter);

            $data = $query
                ->selectRaw("DAY(created_at) as day, COUNT(*) as total")
                ->groupBy('day')
                ->orderBy('day')
                ->pluck('total', 'day');

            $monthName = date('F', mktime(0, 0, 0, (int) $monthFilter, 1));

            return [
                'datasets' => [
                    [
                        'label' => "Orders (paid) - {$monthName} {$year}",
                        'data' => $data->values(),
                        'borderColor' => '#3B82F6',
                        'backgroundColor' => 'rgba(59, 130, 246, 0.3)',
                    ],
                ],
                'labels' => $data->keys(),
            ];
        }

        $data = $query
            ->selectRaw("MONTH(created_at) as month, COUNT(*) as total")
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month')
            ->toArray();

        $monthlyData = collect(range(1, 12))->map(
            fn($m) => $data[$m] ?? 0
        );

        return [
            'datasets' => [
                [
                    'label' => "Orders (paid) - {$year}",
                    'data' => $monthlyData->values(),
                    'borderColor' => '#3B82F6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.3)',
                ],
            ],
            'labels' => [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}