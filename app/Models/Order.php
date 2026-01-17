<?php

namespace App\Models;

use App\Enum\OrderStatus;
use App\Enum\PaymentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'total_price',
        'status',
        'payment_method',
        'payment_intent_id',
        'discount',
        'address',
        'phone',
        'name',
        'surname'
    ];

    protected $casts = [
        'status' => OrderStatus::class,
        'payment_method' => PaymentType::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class);
    }

    public function getUnitPriceAttribute(): float
    {
        return $this->product->sell_price;
    }

    public function getSubtotalAttribute(): float
    {
        return $this->unit_price * $this->quantity;
    }

    public function getDiscountAmountAttribute(): float
    {
        if ($this->discount > 0) {
            return $this->subtotal * ($this->discount / 100);
        }
        return $this->product->discount
            ? $this->subtotal * ($this->product->discount / 100)
            : 0;
    }

    public function getFinalTotalAttribute(): float
    {
        return $this->subtotal - $this->discount_amount;
    }

    public function isPaid(): bool
    {
        return $this->status === OrderStatus::PAID;
    }

    public function isPending(): bool
    {
        return $this->status === OrderStatus::PENDING;
    }
}
