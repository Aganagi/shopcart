<?php

use App\Http\Controllers\{BasketController, PublicController, RatingController, WishlistController, PaymentController, EmailSubscriptionController};
use App\Http\Controllers\Auth\{ForgotPasswordController, AuthController, GoogleAuthController};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/shop', [PublicController::class, 'filterProduct'])->name('shop');
Route::get('/product/{id}', [PublicController::class, 'getProduct'])->name('product');
Route::get('/hot-deal', [PublicController::class, 'hotDeal'])->name('hot-deal');
Route::get('/blog', fn() => Inertia::render('blog/index'))->name('blog');
Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist');
Route::get('/about', fn() => Inertia::render('links/about'))->name('about');
Route::get('/contact-us', fn() => Inertia::render('links/contact'))->name('contact');
Route::get('/terms', fn() => Inertia::render('links/terms'))->name('terms');
Route::get('/privacy', fn() => Inertia::render('links/privacy'))->name('privacy');
Route::get('/faqs', fn() => Inertia::render('links/faqs'))->name('faqs');
Route::get('/help', fn() => Inertia::render('links/help'))->name('help');
Route::get('/category/{name}', [PublicController::class, 'selectedCategory'])->name('category');
Route::get('/basket', fn() => Inertia::render('basket/index'))->name('basket');
Route::get('/rating', [RatingController::class, 'index'])->name('rating');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/subscribe', [EmailSubscriptionController::class, 'store'])->name('subscribe.store');
Route::get('/subscribe/verify/{token}', [EmailSubscriptionController::class, 'verify'])->name('subscribe.verify');
Route::get('/subscribe/unsubscribe/{token}', [EmailSubscriptionController::class, 'unsubscribe'])->name('subscribe.unsubscribe');

Route::middleware('guest')->group(function () {
    Route::get('/forgot-password', [ForgotPasswordController::class, 'forgotPassword'])
        ->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink'])
        ->name('password.email');
    Route::get('/reset-password/{token}', [ForgotPasswordController::class, 'resetPassword'])
        ->name('password.reset');
    Route::post('/reset-password', [ForgotPasswordController::class, 'updatePassword'])
        ->name('password.update');
});
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle'])
    ->name('google.redirect');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])
    ->name('google.callback');

Route::middleware(['auth:web'])->group(function () {
    Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/reset', [WishlistController::class, 'reset'])->name('wishlist.reset');
    Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
    Route::post('/wishlist/sync', [WishlistController::class, 'sync'])->name('wishlist.sync');
    Route::get('/payment', [PaymentController::class, 'show'])->name('payment');
    Route::post('/payment/processPayment', [PaymentController::class, 'processPayment']);
    Route::post('/products/{product}/rate', [RatingController::class, 'store'])->name('products.rate');
    Route::post('/basket', [BasketController::class, 'store'])->name('basket.store');
    Route::post('/logout', [AuthController::class, 'logOutWeb'])->name('logout');
});