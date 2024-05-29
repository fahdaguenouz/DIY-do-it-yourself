<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    public function index(){
        // Retrieve all levels or implement your own logic for which roles to retrieve
        $levels = Level::all();
        return response()->json($levels);

    }
}
