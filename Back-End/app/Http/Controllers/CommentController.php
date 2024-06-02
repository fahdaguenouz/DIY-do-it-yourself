<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, $tutorialId)
    {
        $request->validate([
            'description' => 'required|string|max:255',
        ]);

        $user = $request->user(); // Ensure user is authenticated

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $comment = Comment::create([
            'tutorial_id' => $tutorialId,
            'user_id' => $user->id,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Comment added successfully!', 'comment' => $comment], 201);
    }
    public function index()
    {
        $comments = Comment::with('user', 'tutorial')->get();
        return response()->json(['comments' => $comments]);
    }
}
