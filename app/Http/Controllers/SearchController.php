<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function live(Request $request)
    {
        $query = $request->get('q', '');
        if (strlen($query) < 2) {
            return response()->json([
                'products'=> [],
                'categories' => [],
                'brands' => []
            ]);
        }

        $products = Product::where('name', 'like', "%$query%")->select('*')->limit(5)->get();
        $categories = Category::where('name', 'like', "%$query%")->select('*')->limit(5)->get();
        $brands = Brand::where('name', 'like', "%$query%")->select('*')->limit(5)->get();
        
        return response()->json([
            'products'   => $products,
            'brands'     => $brands,
            'categories' => $categories,
        ]);
    }
}
