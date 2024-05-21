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
        // Retrieve all users or implement your own logic for which users to retrieve
        $users = User::all();

        // Return the list of users
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
