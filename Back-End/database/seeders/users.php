<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
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
                'profile_picture' => 'storage/profile_pictures/Fahd.png',
            ]
        ];

        DB::table('users')->insert($users);

        $faker = Faker::create();

        for ($i = 2; $i <= 10; $i++) {
            DB::table('users')->insert([
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'email' => $faker->unique()->safeEmail,
                'adresse' => $faker->address,
                'password' => Hash::make('password'),
                'role_id' => rand(1, 3),
                'level_id' => rand(1, 10),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
                'remember_token' => Str::random(10),
                'profile_picture' => 'storage/profile_pictures/default.png',
            ]);
        }
        
    }
}
