<?php

namespace App\Http\Controllers;

use App\Models\Signal;
use Illuminate\Http\Request;

class SignalController extends Controller
{
    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'tutorial_id' => 'required|exists:tutorials,id',
            'reason' => 'required|string|max:255',
        ]);

        // Create new signal
        $signal = new Signal();
        $signal->tutorial_id = $request->tutorial_id;
        $signal->reason = $request->reason;
        $signal->date = now();
        $signal->save();

        return response()->json(['message' => 'Signal created successfully.'], 201);
    }

    public function confirm(Request $request, $signal_id)
    {
        $signal = Signal::find($signal_id);
        if ($signal) {
            $tutorial = $signal->tutorial;
            $tutorial->status = 'suspended';
            $tutorial->save();

            // Optionally, delete the signal after confirmation
            

            return response()->json(['message' => 'Signal confirmed and tutorial suspended.']);
        }

        return response()->json(['message' => 'Signal not found.'], 404);
    }

    public function index()
    {
        $signals = Signal::with('tutorial')->get();
        return response()->json($signals);
    }
}
