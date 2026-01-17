<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class ProductDiscountNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public $product,
        public $oldPrice,
        public $newPrice,
    ) {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $unsubscribeUrl = url('/subscribe/unsubscribe/' . $notifiable->token);

        $productUrl = url('/product/' . $this->product->id);

        $savings = $this->oldPrice - $this->newPrice;
        $currentDiscount = $this->product->discount ?? 0;

        Log::info('Forming a letter', [
            'product_id' => $this->product->id,
            'product_name' => $this->product->name,
            'product_sell_price' => $this->product->sell_price,
            'product_discount' => $this->product->discount,
            'oldPrice_passed' => $this->oldPrice,
            'newPrice_passed' => $this->newPrice,
            'savings' => $savings,
        ]);

        $message = (new MailMessage)
            ->subject('🔥 Special offer for' . $this->product->name . ' - Shopcart')
            ->greeting('Great news!')
            ->line('We have a special offer for you!')
            ->line('**' . $this->product->name . '**');

        if ($currentDiscount > 0) {
            $message->line('Current discount: **' . $currentDiscount . '%**');
        }

        $message->line('~~Was: ' . number_format($this->oldPrice, 2) . ' ₼~~')
            ->line('**Now: ' . number_format($this->newPrice, 2) . ' ₼**')
            ->line('💰 **Saving: ' . number_format($savings, 2) . ' ₼**')
            ->action('View product', $productUrl)
            ->line(`Don't miss this opportunity!`)
            ->line('')
            ->line('---')
            ->line('[Unsubscribe from notifications](' . $unsubscribeUrl . ')')
            ->salutation('Sincerely, the Shopcart team');

        return $message;
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
