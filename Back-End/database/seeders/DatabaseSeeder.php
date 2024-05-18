<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Fahd Aguenouz',
            'email' => 'Fahd@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('fahd123456789'),  // Ensuring the password is securely hashed
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
