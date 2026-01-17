<?php

namespace App\Observers;

use App\Jobs\SendDiscountNotifications;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updating(Product $product): void
    {
        Log::info('=== ProductObserver::updating вызван ===', [
            'id' => $product->id,
            'name' => $product->name,
            'isDirty_sell_price' => $product->isDirty('sell_price'),
            'isDirty_discount' => $product->isDirty('discount'),
        ]);

        if ($product->isDirty('sell_price') || $product->isDirty('discount')) {

            $oldSellPrice = floatval($product->getOriginal('sell_price'));
            $oldDiscount = floatval($product->getOriginal('discount') ?? 0);
            $newSellPrice = floatval($product->sell_price);
            $newDiscount = floatval($product->discount ?? 0);

            Log::info('The price or discount changes', [
                'old_sell_price' => $oldSellPrice,
                'old_discount' => $oldDiscount,
                'new_sell_price' => $newSellPrice,
                'new_discount' => $newDiscount,
            ]);

            $oldFinalPrice = $oldSellPrice;
            if ($oldDiscount > 0 && $oldDiscount <= 100) {
                $oldFinalPrice = round($oldSellPrice - ($oldSellPrice * $oldDiscount / 100), 2);
            }

            $newFinalPrice = $newSellPrice;
            if ($newDiscount > 0 && $newDiscount <= 100) {
                $newFinalPrice = round($newSellPrice - ($newSellPrice * $newDiscount / 100), 2);
            }

            Log::info('!!! FINAL PRICES CALCULATED !!!', [
                'old_final_price' => $oldFinalPrice,
                'new_final_price' => $newFinalPrice,
                'price_decreased' => $newFinalPrice < $oldFinalPrice,
            ]);

            if ($newFinalPrice < $oldFinalPrice) {
                $savingsAmount = $oldFinalPrice - $newFinalPrice;

                Log::info('!!! PRICE REDUCED - SENDING NOTIFICATIONS!!!', [
                    'product' => $product->name,
                    'old_price' => $oldFinalPrice,
                    'new_price' => $newFinalPrice,
                    'savings' => $savingsAmount,
                ]);

                SendDiscountNotifications::dispatch(
                    $product,
                    $oldFinalPrice,
                    $newFinalPrice
                );
            } else {
                Log::info('The price has not dropped - we are NOT sending notifications.');
            }
        }
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
