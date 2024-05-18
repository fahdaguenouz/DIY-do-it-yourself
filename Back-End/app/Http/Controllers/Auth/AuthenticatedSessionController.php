<?php

namespace App\Http\Controllers\Auth;


use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        // Find the user by email
        $user = User::where('email', $credentials['email'])->first();

        // Check if user exists and password is correct
        if ($user && Hash::check($credentials['password'], $user->password)) {
            // Generate new token
            $token = $user->createToken('DIY_Token')->plainTextToken;
            $request->session()->regenerate();

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        // If authentication fails, return error response
        return response()->json(['error' => 'The provided credentials do not match our records.'], 401);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        // Logout logic not applicable with Sanctum as it uses tokens, revise if needed
        $user = $request->user();
        $user->tokens()->delete(); // This revokes all tokens assigned to the user

        return response()->noContent();
    }
}
