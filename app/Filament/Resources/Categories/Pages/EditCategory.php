<?php

namespace App\Filament\Resources\Categories\Pages;

use App\Filament\Resources\Categories\CategoryResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditCategory extends EditRecord
{
    protected static string $resource = CategoryResource::class;

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
            ->title('Category updated successfully')
            ->success()
            ->send();
    }
    public function getRedirectUrl(): string|null
    {
        return $this->getResource()::getUrl('index');
    }
}
