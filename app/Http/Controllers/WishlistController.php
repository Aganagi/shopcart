<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $products = [];
        $initialLikedIds = [];

        if (Auth::check()) {
            $products = Wishlist::where('user_id', Auth::id())
                ->with('product.category', 'product.brand')
                ->get()
                ->pluck('product')
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'image' => $product->image,
                        'category' => $product->category,
                        'brand' => $product->brand,
                        'is_active' => $product->is_active,
                        'sell_price' => $product->sell_price,
                        'discount' => $product->discount ?? 0,
                        'stock' => $product->stock ?? 0,
                    ];
                });

            $initialLikedIds = Wishlist::where('user_id', Auth::id())
                ->pluck('product_id')
                ->toArray();
        }
        return Inertia::render('wishlist/index', [
            'products' => $products,
            'initialLikedIds' => $initialLikedIds
        ]);
    }
    public function store(Request $request)
    {
        $request->validate(['product_id' => 'required|exists:products,id']);

        Wishlist::firstOrCreate([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id
        ]);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Added to wishlist']);
        }

        return redirect()->back()->with('success', 'Product added to wishlist');
    }
    public function destroy($id)
    {
        Wishlist::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->delete();

        return redirect()->back()->with('success', 'Product removed from wishlist');
    }

    public function reset()
    {
        Wishlist::where('user_id', Auth::id())->delete();

        return redirect()->back()->with('success', 'Wishlist reset');
    }
    public function sync(Request $request)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id'
        ]);
        $userId = Auth::id();
        $productIds = $request->input('product_ids', []);

        foreach ($productIds as $productId) {
            Wishlist::firstOrCreate([
                'user_id' => $userId,
                'product_id' => $productId
            ]);
        }
        $updatedIds = Wishlist::where('user_id', $userId)
            ->pluck('product_id')
            ->toArray();

        return back();
    }
}
