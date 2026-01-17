<?php

namespace App\Enum;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case CANCELLED = 'cancelled';
    case PAID = 'paid';
}
