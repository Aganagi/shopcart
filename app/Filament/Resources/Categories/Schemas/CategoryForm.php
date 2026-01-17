<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()->description('Create a new category')->schema([
                    TextInput::make('name')
                        ->required()->rules(['max:25', 'string', 'unique:categories,name']),
                    TextInput::make('slug')->rules(['max:255', 'string']),
                    FileUpload::make('image')
                        ->disk('public')
                        ->rules(['image', 'max:1024']),
                ])->columns(2)->columnSpanFull()
            ]);
    }
}
