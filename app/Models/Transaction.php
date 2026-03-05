<?php

namespace App\Models;

use App\Enum\OrderStatus;
use App\Enum\PaymentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'order_id',
        'transaction_id',
        'amount',
        'status',
        'payment_method',
        'card_last4',
        'card_holder_name',
        'card_expiry',
        'response_data',
    ];
    protected $casts = [
        // 'status' => OrderStatus::class,
        // 'payment_method' => PaymentType::class,
        'response_data' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
