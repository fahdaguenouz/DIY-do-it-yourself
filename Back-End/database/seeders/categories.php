<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categories extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics', 'description' => 'Tutorials for electronic devices', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Computers', 'description' => 'Tutorials for computer hardware and software', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Home Appliances', 'description' => 'Tutorials for home appliances', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Hardware', 'description' => 'Tutorials for hardware tools', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Tools', 'description' => 'Tutorials for using various tools', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Software', 'description' => 'Tutorials for software applications', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Cars', 'description' => 'Tutorials for car maintenance and repair', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Clothes', 'description' => 'Tutorials for clothing care and repair', 'Category-picture' => 'path_to_picture'],
            ['name' => 'Phones', 'description' => 'Tutorials for smartphone use and repair', 'Category-picture' => 'path_to_picture'],
        ];
        DB::table('categories')->insert($categories);

    }
}
