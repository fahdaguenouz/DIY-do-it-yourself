<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LikeController extends Controller
{
    public function likeTutorial(Request $request, $id)
{
    $user = auth()->user(); // Get the authenticated user
    Log::info('User:', ['user' => $user]);

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $like = Like::where('tutorial_id', $id)->where('user_id', $user->id)->first();

    if ($like) {
        // If already liked, unlike
        $like->delete();
        return response()->json(['message' => 'Tutorial unliked'], 200);
    } else {
        // Like the tutorial
        Like::create([
            'tutorial_id' => $id,
            'user_id' => $user->id,
        ]);
        return response()->json(['message' => 'Tutorial liked'], 201);
    }
}
public function getLikes()
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $likes = Like::all(); // Fetch all likes
    return response()->json ($likes);
}
}
