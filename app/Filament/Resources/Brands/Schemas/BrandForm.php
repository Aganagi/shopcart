<?php

namespace App\Filament\Resources\Brands\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BrandForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()->description('Create a new brand')->schema([
                    TextInput::make('name')
                        ->rules(['max:25', 'string', 'unique:brands,name'])->required(),
                    TextInput::make('slug')->rules(['max:255', 'string']),
                    FileUpload::make('logo')->disk('public')->rules(['image', 'max:1024']),
                ])->columns(2)->columnSpanFull()
            ]);
    }
}
