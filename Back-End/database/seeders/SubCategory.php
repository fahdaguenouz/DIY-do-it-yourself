<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubCategory extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subcategories = [
            // Electronics
            ['categorie_id' => 1, 'name' => 'Smartphones', 'description' => 'Tutorials for smartphones', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 1, 'name' => 'Laptops', 'description' => 'Tutorials for laptops', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 1, 'name' => 'Tablets', 'description' => 'Tutorials for tablets', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 1, 'name' => 'Televisions', 'description' => 'Tutorials for televisions', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 1, 'name' => 'Cameras', 'description' => 'Tutorials for cameras', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 1, 'name' => 'Speakers', 'description' => 'Tutorials for speakers', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 1, 'name' => 'Headphones', 'description' => 'Tutorials for headphones', 'SubCategory_picture' => 'path_to_picture'],

            // Computers
            ['categorie_id' => 2, 'name' => 'Desktops', 'description' => 'Tutorials for desktop computers', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 2, 'name' => 'Monitors', 'description' => 'Tutorials for monitors', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 2, 'name' => 'Printers', 'description' => 'Tutorials for printers', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 2, 'name' => 'Hard Drives', 'description' => 'Tutorials for hard drives', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 2, 'name' => 'RAM', 'description' => 'Tutorials for RAM', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 2, 'name' => 'Motherboards', 'description' => 'Tutorials for motherboards', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 2, 'name' => 'Power Supplies', 'description' => 'Tutorials for power supplies', 'SubCategory_picture' => 'path_to_picture'],

            // Home Appliances
            ['categorie_id' => 3, 'name' => 'Washing Machines', 'description' => 'Tutorials for washing machines', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 3, 'name' => 'Refrigerators', 'description' => 'Tutorials for refrigerators', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 3, 'name' => 'Microwaves', 'description' => 'Tutorials for microwaves', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 3, 'name' => 'Ovens', 'description' => 'Tutorials for ovens', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 3, 'name' => 'Dishwashers', 'description' => 'Tutorials for dishwashers', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 3, 'name' => 'Air Conditioners', 'description' => 'Tutorials for air conditioners', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 3, 'name' => 'Vacuum Cleaners', 'description' => 'Tutorials for vacuum cleaners', 'SubCategory_picture' => 'path_to_picture'],

            // Hardware
            ['categorie_id' => 4, 'name' => 'Nails', 'description' => 'Tutorials for nails', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 4, 'name' => 'Screws', 'description' => 'Tutorials for screws', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 4, 'name' => 'Bolts', 'description' => 'Tutorials for bolts', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 4, 'name' => 'Hinges', 'description' => 'Tutorials for hinges', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 4, 'name' => 'Locks', 'description' => 'Tutorials for locks', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 4, 'name' => 'Brackets', 'description' => 'Tutorials for brackets', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 4, 'name' => 'Hooks', 'description' => 'Tutorials for hooks', 'SubCategory_picture' => 'path_to_picture'],

            // Tools
            ['categorie_id' => 5, 'name' => 'Power Tools', 'description' => 'Tutorials for power tools', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 5, 'name' => 'Hand Tools', 'description' => 'Tutorials for hand tools', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 5, 'name' => 'Gardening Tools', 'description' => 'Tutorials for gardening tools', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 5, 'name' => 'Construction Tools', 'description' => 'Tutorials for construction tools', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 5, 'name' => 'Automotive Tools', 'description' => 'Tutorials for automotive tools', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 5, 'name' => 'Plumbing Tools', 'description' => 'Tutorials for plumbing tools', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 5, 'name' => 'Woodworking Tools', 'description' => 'Tutorials for woodworking tools', 'SubCategory_picture' => 'path_to_picture'],


                        // Software
                        ['categorie_id' => 6, 'name' => 'Operating Systems', 'description' => 'Tutorials for operating systems', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 6, 'name' => 'Productivity Software', 'description' => 'Tutorials for productivity software', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 6, 'name' => 'Graphic Design Software', 'description' => 'Tutorials for graphic design software', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 6, 'name' => 'Video Editing Software', 'description' => 'Tutorials for video editing software', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 6, 'name' => 'Antivirus Software', 'description' => 'Tutorials for antivirus software', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 6, 'name' => 'Programming Languages', 'description' => 'Tutorials for programming languages', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 6, 'name' => 'Web Development Tools', 'description' => 'Tutorials for web development tools', 'SubCategory_picture' => 'path_to_picture'],

                        // Cars
                        ['categorie_id' => 7, 'name' => 'Engine', 'description' => 'Tutorials for car engines', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 7, 'name' => 'Transmission', 'description' => 'Tutorials for car transmission systems', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 7, 'name' => 'Brakes', 'description' => 'Tutorials for car brake systems', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 7, 'name' => 'Suspension', 'description' => 'Tutorials for car suspension systems', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 7, 'name' => 'Electrical System', 'description' => 'Tutorials for car electrical systems', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 7, 'name' => 'Body Work', 'description' => 'Tutorials for car body work', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 7, 'name' => 'Interior', 'description' => 'Tutorials for car interior maintenance', 'SubCategory_picture' => 'path_to_picture'],

                        // Clothes
                        ['categorie_id' => 8, 'name' => 'Sewing', 'description' => 'Tutorials for sewing and stitching clothes', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 8, 'name' => 'Dyeing', 'description' => 'Tutorials for dyeing clothes', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 8, 'name' => 'Ironing', 'description' => 'Tutorials for ironing clothes', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 8, 'name' => 'Stain Removal', 'description' => 'Tutorials for removing stains from clothes', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 8, 'name' => 'Folding', 'description' => 'Tutorials for folding clothes', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 8, 'name' => 'Storage', 'description' => 'Tutorials for storing clothes', 'SubCategory_picture' => 'path_to_picture'],
                        ['categorie_id' => 8, 'name' => 'Repair', 'description' => 'Tutorials for repairing clothes', 'SubCategory_picture' => 'path_to_picture'],

                          // Phones
            ['categorie_id' => 9, 'name' => 'Screen Replacement', 'description' => 'Tutorials for replacing phone screens', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 9, 'name' => 'Battery Replacement', 'description' => 'Tutorials for replacing phone batteries', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 9, 'name' => 'Charging Port Repair', 'description' => 'Tutorials for repairing phone charging ports', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 9, 'name' => 'Camera Repair', 'description' => 'Tutorials for repairing phone cameras', 'SubCategory_picture' => 'path_to_picture'],
            ['categorie_id' => 9, 'name' => 'Software Troubleshooting', 'description' => 'Tutorials for troubleshooting phone software issues', 'SubCategory_picture' => 'path_to_picture'],
        ];
        DB::table('subcategories')->insert($subcategories);
    }
}
