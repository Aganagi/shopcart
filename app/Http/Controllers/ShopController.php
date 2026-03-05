<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('q');
        $brandId = $request->get('brand');
        $categoryId = $request->get('category');

        $products = Product::query()
            ->when($query, fn($q) => $q->where('name', 'LIKE', "%{$query}%"))
            ->when($brandId, fn($q) => $q->where('brand_id', $brandId))
            ->when($categoryId, fn($q) => $q->where('category_id', $categoryId))
            ->paginate(12);

        return Inertia::render('shop/index', [
            'products' => $products,
            'filters' => [
                'q' => $query,
                'brand' => $brandId,
                'category' => $categoryId,
            ],
        ]);
    }
}