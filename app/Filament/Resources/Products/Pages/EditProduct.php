<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use App\Jobs\SendDiscountNotifications;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        Log::info('=== handleRecordUpdate ВЫЗВАН ===', [
            'record_id' => $record->id,
            'data_keys' => array_keys($data),
        ]);

        $oldSellPrice = floatval($record->sell_price);
        $oldDiscount = floatval($record->discount ?? 0);

        $oldFinalPrice = $oldSellPrice;
        if ($oldDiscount > 0 && $oldDiscount <= 100) {
            $oldFinalPrice = round($oldSellPrice - ($oldSellPrice * $oldDiscount / 100), 2);
        }

        Log::info('Old values', [
            'old_sell_price' => $oldSellPrice,
            'old_discount' => $oldDiscount,
            'old_final_price' => $oldFinalPrice,
        ]);

        $record->update($data);

        $newSellPrice = floatval($record->sell_price);
        $newDiscount = floatval($record->discount ?? 0);

        $newFinalPrice = $newSellPrice;
        if ($newDiscount > 0 && $newDiscount <= 100) {
            $newFinalPrice = round($newSellPrice - ($newSellPrice * $newDiscount / 100), 2);
        }

        Log::info('New values', [
            'new_sell_price' => $newSellPrice,
            'new_discount' => $newDiscount,
            'new_final_price' => $newFinalPrice,
        ]);

        if ($newFinalPrice < $oldFinalPrice) {
            Log::info('!!! ОТПРАВЛЯЕМ УВЕДОМЛЕНИЯ !!!', [
                'old_final' => $oldFinalPrice,
                'new_final' => $newFinalPrice,
            ]);

            SendDiscountNotifications::dispatch(
                $record,
                $oldFinalPrice,
                $newFinalPrice
            );

            Notification::make()
                ->title('Notifications are being sent')
                ->body(sprintf('Price reduced: %.2f → %.2f ₼', $oldFinalPrice, $newFinalPrice))
                ->success()
                ->send();
        }

        return $record;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
