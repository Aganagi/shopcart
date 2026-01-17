<?php

namespace App\Models;

use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'image'
    ];
    protected static function booted(): void
    {
        static::deleting(function (Category $category) {
            if ($category->products()->count() > 0) {
                Notification::make()
                    ->danger()
                    ->title('Cannot delete category')
                    ->body("This category has {$category->products()->count()} associated products. Please remove them first.")
                    ->persistent()
                    ->send();
                return false;
            }
        });
    }
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
    public function canBeDeleted(): bool
    {
        return $this->products()->count() === 0;
    }
}
