<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;


class EmailSubscription extends Model
{
    use Notifiable;
    protected $fillable = [
        'email',
        'token',
        'is_active',
        'verified_at'
    ];
    protected $casts = [
        'is_active' => 'boolean',
        'verified_at' => 'datetime'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($subscription) {
            $subscription->token = Str::random(64);
        });
    }
    public function isVerified(): bool
    {
        return !is_null($this->verified_at);
    }
    public function routeNotificationForMail($notification)
    {
        return $this->email;
    }
}
