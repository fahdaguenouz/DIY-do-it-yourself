<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatUserRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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


    public function store(UserRequest $request)
    {
        $validated = $request->validated();

        // Handle the profile picture upload
        // Handle the profile picture upload or set the default image path
        $imagePath = $request->hasFile('profile_picture')
            ? $request->file('profile_picture')->store('storage/profile_pictures', 'public')
            : 'storage/profile_pictures/default.png'; // Set default path if no file uploaded


        // Create the user with the profile picture
        $user = User::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'adresse' => $validated['adresse'],
            'role_id' => $validated['role_id'],
            'level_id' => $validated['level_id'],
            'profile_picture' => $imagePath, // Store the image path
        ]);

        $user->load('role', 'level');

        return new UserResource($user);
    }


    public function update(UpdatUserRequest $request, User $user)
{
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $data = $request->validated();

    // Handle the profile picture upload
    if ($request->hasFile('profile_picture')) {
        $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
    }


     // Check if password was provided and hash it
     if (!empty($data['password'])) {
        $data['password'] = Hash::make($data['password']);
    } else {
        unset($data['password']); // Ensure no null password is set
    }

    // Update user with possibly modified data
    $user->update($data);

    return new UserResource($user);
}
}
