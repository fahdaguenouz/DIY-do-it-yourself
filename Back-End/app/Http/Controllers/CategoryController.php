<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Fetch all categories with their subcategories
        $categories = Category::with('subcategories')->get();

        // Return the data (you can customize this part to return a view if needed)
        return response()->json($categories);
    }
}
