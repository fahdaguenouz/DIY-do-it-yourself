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
            ['name' => 'Electronics', 'description' => 'Tutorials for electronic devices', 'Category_picture' => 'categories/circuit-board.png'],
            ['name' => 'Computers', 'description' => 'Tutorials for computer hardware and software', 'Category_picture' => 'categories/computer.png'],
            ['name' => 'Home Appliances', 'description' => 'Tutorials for home appliances', 'Category_picture' => 'categories/plan.png'],
            ['name' => 'Hardware', 'description' => 'Tutorials for hardware tools', 'Category_picture' => 'categories/printer.png'],
            ['name' => 'Tools', 'description' => 'Tutorials for using various tools', 'Category_picture' => 'categories/tool-box.png'],
            ['name' => 'Software', 'description' => 'Tutorials for software applications', 'Category_picture' => 'categories/testing.png'],
            ['name' => 'Cars', 'description' => 'Tutorials for car maintenance and repair', 'Category_picture' => 'categories/car.png'],
            ['name' => 'Clothes', 'description' => 'Tutorials for clothing care and repair', 'Category_picture' => 'categories/clothes-rack.png'],
            ['name' => 'Phones', 'description' => 'Tutorials for smartphone use and repair', 'Category_picture' => 'categories/mobile-phone.png'],
        ];
        DB::table('categories')->insert($categories);

    }
}
