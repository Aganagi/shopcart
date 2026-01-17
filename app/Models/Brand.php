<?php

namespace App\Models;

use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'logo'
    ];
    protected static function booted(): void
    {
        static::deleting(function (Brand $brand) {
            if ($brand->products()->count() > 0) {
                Notification::make()
                    ->danger()
                    ->title('Cannot delete brand')
                    ->body("This brand has {$brand->products()->count()} associated products. Please remove them first.")
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
