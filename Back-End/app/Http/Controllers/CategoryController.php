<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryPictureRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResources;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        // Fetch all categories with their subcategories
        $categories = Category::with('subcategories')->get();

        // Return the data (you can customize this part to return a view if needed)
        return response()->json($categories);
    }

    public function store(StoreCategoryRequest $request)

    {
    Log::info('Received  request:', $request->all());

        // Handle the picture upload if a picture is provided
        if ($request->hasFile('Category_picture')) {
            $picturePath = $request->file('Category_picture')->store('categories', 'public');
        } else {
            $picturePath = null;
        }

        // Create a new category
        $category = new Category();
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->Category_picture = $picturePath;
        $category->save();

        // Return a response
        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }


    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $data = $request->only(['name', 'description']);

        if (count($data) > 0) {
            $category->update($data);
            return new CategoryResources($category);
        } else {
            return response()->json(['message' => 'At least one field must be updated.'], 422);
        }
    }

    public function updatePicture(UpdateCategoryPictureRequest $request, $id)
    {
        Log::info('Received update picture request:', $request->all());

        if ($request->hasFile('Category_picture')) {
            Log::info('Category_picture file received:', [
                'original_name' => $request->file('Category_picture')->getClientOriginalName(),
                'size' => $request->file('Category_picture')->getSize(),
            ]);

            $category = Category::findOrFail($id);

            if ($category->Category_picture) {
                Storage::delete('public/' . $category->Category_picture);
            }

            $picturePath = $request->file('Category_picture')->store('categories', 'public');
            $category->update(['Category_picture' => $picturePath]);

            return new CategoryResources($category);
        } else {
            Log::error('No Category_picture file received.');
            return response()->json(['error' => 'No Category_picture file received.'], 422);
        }
    }


}
