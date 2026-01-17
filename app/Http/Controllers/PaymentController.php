<?php

namespace App\Http\Controllers;

use App\Enum\OrderStatus;
use App\Enum\PaymentType;
use App\Models\Order;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('payment/index');
    }

    public function processPayment(Request $request)
    {
        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.unit_price' => ['required', 'numeric', 'min:0'],
            'items.*.discount_price' => ['nullable', 'numeric', 'min:0'],
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'card_number' => ['required', 'string', 'size:16'],
            'card_holder' => ['required', 'string'],
            'expiry_date' => ['required', 'string'],
            'cvv' => ['required', 'string', 'size:3'],
        ]);

        $orders = [];

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);

            if ($product->stock < $item['quantity']) {
                return back()->withErrors([
                    'items' => "Insufficient stock for product: {$product->name}"
                ]);
            }

            $unitPrice = $item['unit_price'];
            $discountAmount = $item['discount_price'] ?? 0;
            $finalPrice = $unitPrice - $discountAmount;
            $totalPrice = $finalPrice * $item['quantity'];

            $order = Order::create([
                'user_id' => auth()->id(),
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'total_price' => $totalPrice,
                'discount' => $product->discount ?? 0,
                'status' => OrderStatus::PAID,
                'payment_method' => PaymentType::CARD,
                'payment_intent_id' => 'demo_' . Str::uuid(),
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'name' => $validated['name'],
                'surname' => $validated['surname'],
            ]);

            Transaction::create([
                'order_id' => $order->id,
                'transaction_id' => 'txn_' . Str::uuid(),
                'amount' => $totalPrice,
                'status' => 'completed',
                'payment_method' => 'card',
                'card_last4' => substr($validated['card_number'], -4),
                'card_holder_name' => $validated['card_holder'],
                'card_expiry' => $validated['expiry_date'],
                'response_data' => json_encode([
                    'provider' => 'demo',
                    'message' => 'Payment successful',
                    'timestamp' => now()->toISOString(),
                ]),
            ]);

            $product->decrement('stock', $item['quantity']);

            $orders[] = $order;
        }

        return redirect()->route('home')->with('success', 'Payment completed successfully!');
    }
}
