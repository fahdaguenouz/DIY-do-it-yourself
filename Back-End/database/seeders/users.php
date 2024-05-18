<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class users extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'nom' => 'Fahd',
                'prenom' => 'Aguenouz',
                'email' => 'fahd@gmail.com',
                'adresse' => '123 Main Street', // You might want to specify a real address
                'password' => Hash::make('fahd123456789'), // Hashing the password for security
                'role_id' => 1, // Assign a role ID (e.g., 1 for Admin)
                'level_id' => 10, // Assign a level ID (e.g., 1 for Beginner)
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
                'remember_token' => Str::random(10),
            ]
        ];

        DB::table('users')->insert($users);
    }
}
