<?php

namespace App\Jobs;

use App\Models\EmailSubscription;
use App\Notifications\ProductDiscountNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendDiscountNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public $product,
        public $oldPrice,
        public $newPrice
    ) {
    }

    public function handle(): void
    {
        $subscriptions = EmailSubscription::where('is_active', true)
            ->whereNotNull('verified_at')
            ->get();

        Log::info('Отправка уведомлений о скидке', [
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'subscribers_count' => $subscriptions->count(),
            'old_price' => $this->oldPrice,
            'new_price' => $this->newPrice,
        ]);

        foreach ($subscriptions as $subscription) {
            try {
                $subscription->notify(new ProductDiscountNotification(
                    $this->product,
                    $this->oldPrice,
                    $this->newPrice
                ));

                Log::info('Уведомление отправлено', ['email' => $subscription->email]);
            } catch (\Exception $e) {
                Log::error('Ошибка отправки уведомления', [
                    'email' => $subscription->email,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }
    }
}