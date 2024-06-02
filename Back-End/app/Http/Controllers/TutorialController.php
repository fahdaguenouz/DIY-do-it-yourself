<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTutorialRequest;
use App\Http\Requests\UpdateTutorialRequest;
use App\Models\Tutorial;
use App\Models\TutorialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
class TutorialController extends Controller
{

    // Method to get all tutorials
    public function index()
    {
        // Get all tutorials with related media, user, and subcategory
        $tutorials = Tutorial::with(['media', 'user', 'subCategory','likes','comments'])->get();

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
        Log::info($request->all());
        $tutorial = Tutorial::find($id);
        if (!$tutorial) {
            return response()->json(['message' => 'Tutorial not found'], 404);
        }

        $tutorial->titre = $request->titre;
        $tutorial->Sub_Categorie_id = $request->Sub_Categorie_id;
        $tutorial->description = $request->description;

        if ($request->hasFile('cover')) {
            if ($tutorial->cover) {
                Storage::delete($tutorial->cover);
            }
            $tutorial->cover = $request->file('cover')->store('covers');
        }

        $tutorial->save();

        // Update media
        $mediaData = collect($request->input('media', []));
        $existingMedia = $tutorial->media;

        // Remove media that are not present in the request
        foreach ($existingMedia as $existing) {
            if (!$mediaData->contains('order', $existing->order)) {
                Storage::delete($existing->media_url);
                $existing->delete();
            }
        }

        // Update or create media
        foreach ($mediaData as $media) {
            $existingMediaItem = $existingMedia->firstWhere('order', $media['order']);

            if ($existingMediaItem) {
                $existingMediaItem->description = $media['description'];
                if (isset($media['file'])) {
                    Storage::delete($existingMediaItem->media_url);
                    $existingMediaItem->media_url = $media['file']->store('media');
                }
                $existingMediaItem->save();
            } else {
                $newMedia = new TutorialMedia();
                $newMedia->tutorial_id = $tutorial->id;
                $newMedia->description = $media['description'];
                $newMedia->order = $media['order'];
                if (isset($media['file'])) {
                    $newMedia->media_url = $media['file']->store('media');
                }
                $newMedia->save();
            }
        }

        return response()->json(['message' => 'Tutorial updated successfully']);
    }
}
