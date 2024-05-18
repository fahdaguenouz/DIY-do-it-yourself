<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class role extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Moderateur', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Createur', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Standard User', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('roles')->insert($roles);
    }
}
