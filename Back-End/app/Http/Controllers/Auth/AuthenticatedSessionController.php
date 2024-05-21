<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Log;
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
    public function destroy(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            \Log::error('No authenticated user found.');
            return response()->json(['message' => 'No authenticated user found.'], 401);
        }

        // Revoke tokens and handle session only if the user is authenticated
        $user->tokens()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Successfully logged out'], 204);
    }
}
