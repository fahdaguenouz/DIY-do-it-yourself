<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
class tutorial extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Example subcategories (should be replaced with actual subcategory IDs from your database)
        $subcategories = [
            ['id' => 1, 'name' => 'Smartphones'],
            ['id' => 2, 'name' => 'Laptops'],
            ['id' => 3, 'name' => 'Tablets'],
            ['id' => 4, 'name' => 'Televisions'],
            ['id' => 5, 'name' => 'Cameras'],
            ['id' => 6, 'name' => 'Speakers'],
            ['id' => 7, 'name' => 'Headphones'],
            ['id' => 8, 'name' => 'Desktops'],
            ['id' => 9, 'name' => 'Monitors'],
            ['id' => 10, 'name' => 'Printers'],
            ['id' => 11, 'name' => 'Hard Drives'],
            ['id' => 12, 'name' => 'RAM'],
            ['id' => 13, 'name' => 'Motherboards'],
            ['id' => 14, 'name' => 'Power Supplies'],
            ['id' => 15, 'name' => 'Washing Machines'],
            ['id' => 16, 'name' => 'Refrigerators'],
            ['id' => 17, 'name' => 'Microwaves'],
            ['id' => 18, 'name' => 'Ovens'],
            ['id' => 19, 'name' => 'Dishwashers'],
            ['id' => 20, 'name' => 'Air Conditioners'],
            ['id' => 21, 'name' => 'Vacuum Cleaners'],
            ['id' => 22, 'name' => 'Nails'],
            ['id' => 23, 'name' => 'Screws'],
            ['id' => 24, 'name' => 'Bolts'],
            ['id' => 25, 'name' => 'Hinges'],
            ['id' => 26, 'name' => 'Locks'],
            ['id' => 27, 'name' => 'Brackets'],
            ['id' => 28, 'name' => 'Hooks'],
            ['id' => 29, 'name' => 'Power Tools'],
            ['id' => 30, 'name' => 'Hand Tools'],
            ['id' => 31, 'name' => 'Gardening Tools'],
            ['id' => 32, 'name' => 'Construction Tools'],
            ['id' => 33, 'name' => 'Automotive Tools'],
            ['id' => 34, 'name' => 'Plumbing Tools'],
            ['id' => 35, 'name' => 'Woodworking Tools'],
            ['id' => 36, 'name' => 'Operating Systems'],
            ['id' => 37, 'name' => 'Productivity Software'],
            ['id' => 38, 'name' => 'Graphic Design Software'],
            ['id' => 39, 'name' => 'Video Editing Software'],
            ['id' => 40, 'name' => 'Antivirus Software'],
            ['id' => 41, 'name' => 'Programming Languages'],
            ['id' => 42, 'name' => 'Web Development Tools'],
            ['id' => 43, 'name' => 'Engine'],
            ['id' => 44, 'name' => 'Transmission'],
            ['id' => 45, 'name' => 'Brakes'],
            ['id' => 46, 'name' => 'Suspension'],
            ['id' => 47, 'name' => 'Electrical System'],
            ['id' => 48, 'name' => 'Body Work'],
            ['id' => 49, 'name' => 'Interior'],
            ['id' => 50, 'name' => 'Sewing'],
            ['id' => 51, 'name' => 'Dyeing'],
            ['id' => 52, 'name' => 'Ironing'],
            ['id' => 53, 'name' => 'Stain Removal'],
            ['id' => 54, 'name' => 'Folding'],
            ['id' => 55, 'name' => 'Storage'],
            ['id' => 56, 'name' => 'Repair'],
            ['id' => 57, 'name' => 'Screen Replacement'],
            ['id' => 58, 'name' => 'Battery Replacement'],
            ['id' => 59, 'name' => 'Charging Port Repair'],
            ['id' => 60, 'name' => 'Camera Repair'],
            ['id' => 61, 'name' => 'Software Troubleshooting'],
        ];

        // Randomly decide the number of tutorials per subcategory
        $tutorialCounts = [
            1 => 5,
            2 => 3,
            3 => 0,
            4 => 10,
            5 => 7,
            6 => 2,
            7 => 4,
            8 => 1,
            9 => 6,
            10 => 5,
            11 => 3,
            12 => 8,
            13 => 2,
            14 => 4,
            15 => 7,
            16 => 3,
            17 => 6,
            18 => 1,
            19 => 5,
            20 => 2,
            21 => 9,
            22 => 0,
            23 => 4,
            24 => 1,
            25 => 3,
            26 => 6,
            27 => 2,
            28 => 8,
            29 => 4,
            30 => 5,
            31 => 3,
            32 => 6,
            33 => 7,
            34 => 1,
            35 => 2,
            36 => 8,
            37 => 4,
            38 => 3,
            39 => 7,
            40 => 2,
            41 => 6,
            42 => 1,
            43 => 5,
            44 => 3,
            45 => 2,
            46 => 4,
            47 => 6,
            48 => 5,
            49 => 3,
            50 => 1,
            51 => 4,
            52 => 2,
            53 => 6,
            54 => 3,
            55 => 1,
            56 => 5,
            57 => 4,
            58 => 2,
            59 => 3,
            60 => 1,
            61 => 5,
        ];

        foreach ($subcategories as $subcategory) {
            $count = $tutorialCounts[$subcategory['id']] ?? rand(1, 10);

            for ($i = 0; $i < $count; $i++) {
                $tutorialId = DB::table('tutorials')->insertGetId([
                    'titre' => $faker->sentence,
                    'Sub_Categorie_id' => $subcategory['id'],
                    'user_id' => rand(1, 10),
                    'cover' => $faker->imageUrl(640, 480, 'technics', true, 'Faker'),
                    'description' => $faker->paragraph,
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $mediaCount = rand(1, 5);
                for ($j = 0; $j < $mediaCount; $j++) {
                    DB::table('tutorial_media')->insert([
                        'tutorial_id' => $tutorialId,
                        'media_type' => 'photo',
                        'media_url' => $faker->imageUrl(640, 480, 'technics', true, 'Faker'),
                        'description' => $faker->sentence,
                        'order' => $j,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
