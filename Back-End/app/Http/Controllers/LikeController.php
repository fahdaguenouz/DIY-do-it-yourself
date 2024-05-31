<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likeTutorial(Request $request, $id)
    {
        $user = auth()->user();
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
}
