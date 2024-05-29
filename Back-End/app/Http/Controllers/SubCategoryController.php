<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryResources;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SubCategoryController extends Controller
{
    public function store(StoreSubCategoryRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('SubCategory_picture')) {
            $data['SubCategory_picture'] = $request->file('SubCategory_picture')->store('subcategories', 'public');
            // $picturePath = $request->file('Category_picture')->store('categories', 'public');

        }

        $subcategory = Subcategory::create($data);

        return new SubCategoryResources($subcategory);
    }

    public function update(UpdateSubCategoryRequest $request,$id)
    {
        try {
            // Load the subcategory by ID
            $subcategory = Subcategory::findOrFail($id);

            // Validate and get the request data
            $data = $request->validated();

            // Log the request data
            \Log::info('Request Data: ', $data);

            // Check if picture is being updated
            if ($request->hasFile('SubCategory_picture')) {
                $request->validate([
                    'SubCategory_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size if needed
                ]);

                // Delete old picture if it exists
                if ($subcategory->SubCategory_picture) {
                    Storage::delete('public/' . $subcategory->SubCategory_picture);
                }

                $data['SubCategory_picture'] = $request->file('SubCategory_picture')->store('subcategories', 'public');
            }

            // Directly set the attributes
            $subcategory->name = $data['name'];
            $subcategory->description = $data['description'];
            $subcategory->categorie_id = $data['categorie_id'];
            if (isset($data['SubCategory_picture'])) {
                $subcategory->SubCategory_picture = $data['SubCategory_picture'];
            }

            // Log the final data to be updated
            \Log::info('Final Update Data: ', $data);

            // Save the changes
            $updateResult = $subcategory->save();
            \Log::info('Update Result: ', [$updateResult]);

            if ($updateResult) {
                return new SubCategoryResources($subcategory);
            } else {
                return response()->json(['message' => 'Update failed'], 500);
            }
        } catch (\Exception $e) {
            \Log::error('Update Error: ', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Update error', 'error' => $e->getMessage()], 500);
        }
    }
}
