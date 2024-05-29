<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(){
        // Retrieve all roles or implement your own logic for which roles to retrieve
        $roles = Role::all();
        return response()->json($roles);

    }
}
