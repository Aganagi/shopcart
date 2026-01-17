<?php

namespace App\Notifications;

use App\Models\EmailSubscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmailSubscription extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public EmailSubscription $subscription)
    {
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
    public function toMail(object $notifiable): MailMessage
    {
        $verifyUrl = url('/subscribe/verify/' . $this->subscription->token);

        return (new MailMessage)
            ->subject('Подтвердите подписку на уведомления - Shopcart')
            ->greeting('Здравствуйте!')
            ->line('Спасибо за подписку на наши уведомления о скидках!')
            ->line('Пожалуйста, нажмите кнопку ниже для подтверждения.')
            ->action('Подтвердить подписку', $verifyUrl)
            ->line('Если вы не подписывались, просто проигнорируйте это письмо.')
            ->salutation('С уважением, команда Shopcart');
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
