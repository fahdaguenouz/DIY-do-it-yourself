<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTutorialRequest;
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
}
