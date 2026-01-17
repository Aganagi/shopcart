<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('slug'),
                TextEntry::make('buy_price')
                    ->numeric(),
                TextEntry::make('sell_price')
                    ->numeric(),
                TextEntry::make('stock')
                    ->numeric(),
                IconEntry::make('is_active')
                    ->boolean(),
                ImageEntry::make('image'),
                TextEntry::make('category.name')
                    ->numeric(),
                TextEntry::make('brand.name')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
