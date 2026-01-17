<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->numeric()
                    ->sortable()->searchable()->toggleable(),
                TextColumn::make('product_id')
                    ->numeric()
                    ->sortable()->searchable()->toggleable(),
                TextColumn::make('quantity')
                    ->numeric()
                    ->sortable()->searchable()->toggleable(),
                TextColumn::make('total_price')
                    ->numeric()
                    ->sortable()->searchable()->toggleable(),
                TextColumn::make('status')
                    ->searchable()->toggleable(),
                TextColumn::make('payment_method')
                    ->searchable()->toggleable(),
                TextColumn::make('discount')
                    ->numeric()
                    ->sortable()->searchable()->toggleable(),
                TextColumn::make('address')
                    ->searchable()->toggleable(),
                TextColumn::make('phone')
                    ->searchable()->toggleable(),
                TextColumn::make('name')
                    ->searchable()->toggleable(),
                TextColumn::make('surname')
                    ->searchable()->toggleable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Filter::make('user_id')
                    ->label('User'),
                Filter::make('product_id')
                    ->label('Product'),
                Filter::make('quantity')
                    ->label('Quantity'),
                Filter::make('total_price')
                    ->label('Total Price'),
                Filter::make('status')
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make()
                    ->successNotificationTitle('Product deleted')
                    ->failureNotificationTitle('Failed to delete some products'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->successNotificationTitle('Order deleted!'),
                ]),
            ]);
    }
}
