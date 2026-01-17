<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PublicController extends Controller
{
    private function loadProductsWithRatings($query)
    {
        return $query->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count');
    }
    public function index()
    {
        $brands = Brand::get(['id', 'name', 'logo']);
        $categories = Category::withCount('products')->orderByDesc('products_count')->get();
        $products = Product::with(['category:id,name,slug', 'brand:id,name,slug'])
            ->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count')
            ->get();
        return Inertia::render('home/index', [
            'brands' => $brands,
            'categories' => $categories,
            'products' => $products
        ]);
    }
    private function applyPriceFilter($query, $price)
    {
        match ($price) {
            'Under 100' => $query->where('sell_price', '<', 100),
            '100-200' => $query->whereBetween('sell_price', [100, 200]),
            '200-300' => $query->whereBetween('sell_price', [200, 300]),
            '300-400' => $query->whereBetween('sell_price', [300, 400]),
            'Over 500' => $query->where('sell_price', '>', 500),
            default => null
        };
    }
    public function filterProduct(Request $request)
    {
        $query = Product::select([
            'id',
            'name',
            'sell_price',
            'discount',
            'stock',
            'image',
            'category_id',
            'brand_id',
            'description'
        ])
            ->with([
                'category:id,name,slug',
                'brand:id,name,slug'
            ])
            ->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count');
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('brand')) {
            $query->where('brand_id', $request->brand);
        }

        if ($request->filled('price')) {
            $this->applyPriceFilter($query, $request->price);
        }
        return Inertia::render('shop/index', [
            'products' => $query->paginate(20),
            'categories' => Category::select(['id', 'name'])->get(),
            'brands' => Brand::select(['id', 'name'])->get(),
            'filters' => $request->only(['category', 'brand', 'price']),
        ]);
    }
    public function selectedCategory($name)
    {
        $category = Category::where('name', $name)
            ->get(['id', 'name', 'slug'])
            ->firstOrFail();

        $products = Product::with([
            'category:id,name,slug',
            'brand:id,name,slug'
        ])
            ->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count')
            ->where('category_id', $category->id)
            ->get([
                'id',
                'name',
                'sell_price',
                'discount',
                'image',
                'category_id',
                'brand_id',
                'description'
            ]);
        return Inertia::render('category/index', [
            'selectedCategory' => $category,
            'products' => $products,
            'categories' => Category::get(['id', 'name', 'slug'])

        ]);
    }
    public function getProduct($id)
    {
        $product = Product::select([
            'id',
            'name',
            'sell_price',
            'discount',
            'stock',
            'image',
            'category_id',
            'brand_id',
            'description',
            'stock'
        ])
            ->with([
                'category:id,name,slug',
                'brand:id,name,slug'
            ])
            ->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count')
            ->findOrFail($id);
        $userRating = null;
        if (Auth::check()) {
            $userRating = $product->ratings()
                ->where('user_id', Auth::id())
                ->first()?->rating;
        }
        $relatedProducts = Product::with(['category:id,name,slug', 'brand:id,name,slug'])
            ->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $id)
            ->take(4)
            ->get();
        return Inertia::render('product/index', [
            'product' => $product,
            'brand' => $product->brand,
            'category' => $product->category,
            'relatedProducts' => $relatedProducts,
            'userRating' => $userRating,
        ]);
    }
    public function hotDeal()
    {
        $products = Product::with(['category:id,name,slug', 'brand:id,name,slug'])
            ->withAvg('ratings as average_rating', 'rating')
            ->withCount('ratings as ratings_count')
            ->where('discount', 0)
            ->orWhere('discount', null)
            ->get();
        return Inertia::render('hot-deal/index', [
            'products' => $products
        ]);
    }
}
