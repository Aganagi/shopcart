<?php

namespace App\Http\Controllers;

use App\Models\EmailSubscription;
use App\Notifications\VerifyEmailSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class EmailSubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:email_subscriptions,email',
        ], [
            'email.required' => 'Email обязателен для заполнения',
            'email.email' => 'Введите корректный email адрес',
            'email.unique' => 'Этот email уже подписан на уведомления',
        ]);

        $subscription = EmailSubscription::create([
            'email' => $validated['email'],
        ]);
        Notification::route('mail', $subscription->email)
            ->notify(new VerifyEmailSubscription($subscription));

        return back()->with('success', 'Check your email to confirm your subscription.');
    }
    public function verify($token)
    {
        $subscription = EmailSubscription::where('token', $token)->firstOrFail();

        if ($subscription->isVerified()) {
            return redirect('/')->with('info', 'Your subscription has already been confirmed.');
        }

        $subscription->update(['verified_at' => now()]);

        return redirect('/')->with('success', 'Subscription successfully confirmed!');
    }
    public function unsubscribe($token)
    {
        $subscription = EmailSubscription::where('token', $token)->firstOrFail();
        $subscription->update(['is_active' => false]);

        return redirect('/')->with('success', 'You have successfully unsubscribed from notifications.');
    }
}
