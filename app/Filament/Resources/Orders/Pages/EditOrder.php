<?php

namespace App\Filament\Resources\Orders\Pages;

use App\Filament\Resources\Orders\OrderResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
    protected function getNotify(): Notification
    {
        return Notification::make()
            ->title('Order updated successfully')
            ->success()
            ->send();
    }
    public function getRedirectUrl(): string|null
    {
        return $this->getResource()::getUrl('index');
    }
}
