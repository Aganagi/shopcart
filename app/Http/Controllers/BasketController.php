<?php

namespace App\Http\Controllers;

use App\Enum\OrderStatus;
use App\Enum\PaymentType;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    public function store(Request $request)
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
            'payment_type' => ['required', 'in:cash,card'],
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
                'status' => OrderStatus::PENDING,
                'payment_method' => PaymentType::CASH,
                'payment_intent_id' => null,
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'name' => $validated['name'],
                'surname' => $validated['surname'],
            ]);

            $product->decrement('stock', $item['quantity']);

            $orders[] = $order;
        }

        return redirect()->route('home')->with('success', 'Order placed successfully! Pay cash on delivery.');
    }
}
