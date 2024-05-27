<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTutorialRequest;
use App\Http\Requests\UpdateTutorialRequest;
use App\Models\Tutorial;
use App\Models\TutorialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class TutorialController extends Controller
{

    // Method to get all tutorials
    public function index()
    {
        // Get all tutorials with related media, user, and subcategory
        $tutorials = Tutorial::with(['media', 'user', 'subCategory'])->get();

        // Return the tutorials as a JSON response
        return response()->json($tutorials);
    }



    public function store(StoreTutorialRequest $request)
{
    // Create the tutorial
    $tutorial = Tutorial::create([
        'titre' => $request->titre,
        'Sub_Categorie_id' => $request->Sub_Category_id,
        'user_id' => $request->user_id,
        'description' => $request->description,
        'cover' => $request->hasFile('cover') ? $request->file('cover')->store('covers', 'public') : null,
    ]);

    // Save the media files
    foreach ($request->media as $mediaItem) {
        $filePath = $mediaItem['file']->store('media', 'public');

        TutorialMedia::create([
            'tutorial_id' => $tutorial->id,
            'media_type' => $mediaItem['file']->getClientOriginalExtension() == 'mp4' ? 'video' : 'photo',
            'media_url' => $filePath,
            'description' => $mediaItem['description'],
            'order' => $mediaItem['order'],
        ]);
    }

    return response()->json(['message' => 'Tutorial created successfully'], 201);
}

public function update(UpdateTutorialRequest $request, $id)
    {
        $tutorial = Tutorial::findOrFail($id);

        $dataToUpdate = $request->only([
            'titre', 'Sub_Category_id', 'user_id', 'description'
        ]);

        // Remove null values from dataToUpdate
        $dataToUpdate = array_filter($dataToUpdate, fn($value) => !is_null($value));

        // Check if there is any change
        if (empty($dataToUpdate) && !$request->hasFile('cover') && empty($request->media)) {
            return response()->json(['message' => 'Nothing to update'], 200);
        }

        // Update tutorial attributes
        $tutorial->update($dataToUpdate);

        // Handle cover image update
        if ($request->hasFile('cover')) {
            // Delete old cover image if exists
            if ($tutorial->cover) {
                Storage::disk('public')->delete($tutorial->cover);
            }
            $tutorial->cover = $request->file('cover')->store('covers', 'public');
            $tutorial->save();
        }

        // Handle media update
        if ($request->media) {
            foreach ($request->media as $mediaItem) {
                if (isset($mediaItem['file'])) {
                    $filePath = $mediaItem['file']->store('media', 'public');
                    TutorialMedia::updateOrCreate(
                        ['tutorial_id' => $tutorial->id, 'order' => $mediaItem['order']],
                        [
                            'media_type' => $mediaItem['file']->getClientOriginalExtension() == 'mp4' ? 'video' : 'photo',
                            'media_url' => $filePath,
                            'description' => $mediaItem['description']
                        ]
                    );
                } elseif (isset($mediaItem['description'])) {
                    TutorialMedia::where('tutorial_id', $tutorial->id)
                        ->where('order', $mediaItem['order'])
                        ->update(['description' => $mediaItem['description']]);
                }
            }
        }

        return response()->json(['message' => 'Tutorial updated successfully'], 200);
    }
}
