<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class level extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            ['name' => 'Beginner', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Intermediate', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Advanced', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Expert', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Master', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Pro', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Elite', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Novice', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Veteran', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Champion', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('levels')->insert($levels);
    }
}
