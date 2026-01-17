<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'buy_price',
        'sell_price',
        'discount',
        'stock',
        'is_active',
        'image',
        'category_id',
        'brand_id'
    ];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }
    public function getDiscountedPriceAttribute(): float
    {
        $sellPrice = (float) ($this->sell_price ?? 0);
        $discount = (float) ($this->discount ?? 0);

        if ($discount > 0 && $discount <= 100) {
            return round($sellPrice - ($sellPrice * $discount / 100), 2);
        }
        return $sellPrice;
    }
    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }
    public function getAverageRatingAttribute()
    {
        return round($this->ratings()->avg('rating') ?? 0, 1);
    }
    public function getRatingsCountAttribute()
    {
        return $this->ratings()->count();
    }
}
