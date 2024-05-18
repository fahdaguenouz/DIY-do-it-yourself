<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'adresse' => $request->adresse,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
                'level_id' => $request->level_id,
            ]);

            event(new Registered($user));

            // Automatically log in the user
            Auth::login($user);

            // Generate the token for the user
            $token = $user->createToken('DIY_Token')->plainTextToken;

            // Return the UserResource and token
            return response()->json([
                'user' => new UserResource($user),
                'token' => $token
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
