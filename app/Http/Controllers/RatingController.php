<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function index(Request $request)
    {
        $productId = $request->query('product_id');

        if (!$productId) {
            abort(404, 'Product ID is required');
        }
        $rating = Rating::where('product_id', $productId)->avg('rating');
        $rating = round($rating ?? 0, 1);

        return Inertia::render('rating/rating', [
            'rating' => $rating,
        ]);
    }
    public function store(Request $request, Product $product)
    {
        if (!Auth::check()) {
            return;
        }
        Rating::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $product->id,
            ],
            [
                'rating' => $request->rating
            ]
        );
        $averageRating = Rating::where('product_id', $product->id)->avg('rating');
        $ratingsCount = Rating::where('product_id', $product->id)->count();
        return back()->with([
            'message' => 'Thank you for your rating! ⭐',
            'average_rating' => round($averageRating, 1),
            'ratings_count' => $ratingsCount
        ]);
    }
}
