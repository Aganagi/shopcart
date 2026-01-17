<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()->schema([
                    TextInput::make('name')
                        ->required()->rules(['string']),
                    TextInput::make('slug')->rules(['string']),
                    TextInput::make('buy_price')
                        ->required()
                        ->numeric()->rules(['min:0']),
                    TextInput::make('sell_price')
                        ->required()
                        ->numeric()->rules(['min:0']),
                ])->columns(2),
                Section::make()->schema([
                    Select::make('category_id')
                        ->relationship('category', 'name')
                        ->required(),
                    Select::make('brand_id')
                        ->relationship('brand', 'name')
                        ->required(),
                    TextInput::make('stock')
                        ->required()
                        ->numeric()->rules(['min:0']),
                    TextInput::make('discount')
                        ->required()
                        ->numeric()->rules(['min:0', 'max:100'])
                ])->columns(2),
                Section::make()->schema([
                    MarkdownEditor::make('description')
                        ->columnSpanFull()->rules(['string']),
                    FileUpload::make('image')
                        ->disk('public')
                        ->image()->rules(['max:1024']),
                    Toggle::make('is_active')
                        ->label('Status')
                        ->onColor('success')
                        ->offColor('danger')
                        ->default(true)
                ])->columns(1)->columnSpanFull()
            ]);
    }
}
