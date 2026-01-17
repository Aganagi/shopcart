<?php

namespace App\Filament\Resources\Products\Tables;

use App\Jobs\SendDiscountNotifications;
use App\Models\Product;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('description')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('buy_price')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('sell_price')
                    ->html()
                    ->formatStateUsing(function ($state, $record) {
                        $oldPrice = number_format($state, 2);
                        $newPrice = number_format($record->discounted_price, 2);
                        if ($record->discount > 0) {
                            return "<span style='text-decoration: line-through; color: #d00;'>{$oldPrice} ₼</span>&nbsp;
                                    <span style='font-weight: bold; color: #090;'>{$newPrice} ₼</span>";
                        }
                        return "<span style='font-weight: bold;'>{$oldPrice} ₼</span>";
                    })
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('discount')
                    ->numeric()
                    ->suffix(' %')
                    ->formatStateUsing(function ($state, $record) {
                        if ($record->discount > 0) {
                            return $state;
                        }
                        return '0';
                    })
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('stock')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                IconColumn::make('is_active')
                    ->boolean()
                    ->toggleable(),
                ImageColumn::make('image')
                    ->disk('public')
                    ->toggleable(),
                TextColumn::make('category.name')
                    ->numeric()
                    ->sortable()->toggleable(),
                TextColumn::make('brand.name')
                    ->numeric()
                    ->sortable()->toggleable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                Filter::make('name')
                    ->label('Name'),
                Filter::make('slug')
                    ->label('Slug'),
                Filter::make('description')
                    ->label('Description'),
                Filter::make('is_active')
                    ->label('Status'),
                Filter::make('category_id')
                    ->label('Category'),
                Filter::make('brand_id')
                    ->label('Brand'),
                Filter::make('created_at')
                    ->label('Created At'),
                Filter::make('updated_at')
                    ->label('Updated At'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make()
                    ->successNotificationTitle('Product deleted')
                    ->failureNotificationTitle('Failed to delete some products'),
                Action::make('sendDiscountNotification')
                    ->label('Send message')
                    ->icon('heroicon-o-bell')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Отправить уведомление о скидке')
                    ->modalDescription('Все подписчики получат email о текущей цене этого товара.')
                    ->action(function (Product $record) {
                        $currentPrice = $record->sell_price;
                        $oldPrice = $currentPrice * 1.2;

                        SendDiscountNotifications::dispatch($record, $oldPrice, $currentPrice);

                        Notification::make()
                            ->title('Уведомления отправляются')
                            ->success()
                            ->send();
                    })
                    ->visible(fn(Product $record) => $record->stock > 0)
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->successNotificationTitle('Product deleted!'),
                ]),
            ]);
    }
}
