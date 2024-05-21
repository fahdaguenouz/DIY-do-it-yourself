<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function index()
    {
        // Fetch all users with their role and level information
        $users = User::with(['role', 'level'])->get();

        return response()->json($users);
    }
    public function getUserData(Request $request)
    {
        $user = $request->user();  // Retrieve the authenticated user

        if ($user) {
            return response()->json(['user' => $user]);
        } else {
            return response()->json(['error' => 'No authenticated user'], 401);
        }
    }
}
