<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Group;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $groups = Group::all();
        $students = [
            [
                'first_name' => 'Aziz',
                'last_name' => 'Rahimov',
                'middle_name' => 'Olimovich',
                'birth_date' => '2005-03-15',
                'gender' => 'male',
                'phone' => '+998901234567',
                'email' => 'aziz@example.com',
                'address' => 'Toshkent shahri, Chilonzor tumani',
                'parent_name' => 'Olim Rahimov',
                'parent_phone' => '+998902345678',
                'status' => 'active',
                'notes' => 'Yaxshi o\'quvchi'
            ],
            [
                'first_name' => 'Malika',
                'last_name' => 'Karimova',
                'middle_name' => 'Alisher qizi',
                'birth_date' => '2006-05-20',
                'gender' => 'female',
                'phone' => '+998903456789',
                'email' => 'malika@example.com',
                'address' => 'Toshkent shahri, Yunusobod tumani',
                'parent_name' => 'Alisher Karimov',
                'parent_phone' => '+998904567890',
                'status' => 'active',
                'notes' => 'Faol o\'quvchi'
            ],
            [
                'first_name' => 'Jasur',
                'last_name' => 'Toshmatov',
                'middle_name' => 'Rustamovich',
                'birth_date' => '2005-08-10',
                'gender' => 'male',
                'phone' => '+998905678901',
                'email' => 'jasur@example.com',
                'address' => 'Toshkent shahri, Mirabad tumani',
                'parent_name' => 'Rustam Toshmatov',
                'parent_phone' => '+998906789012',
                'status' => 'active',
                'notes' => 'Sportchi o\'quvchi'
            ],
            [
                'first_name' => 'Dilnoza',
                'last_name' => 'Umarova',
                'middle_name' => 'Jamshid qizi',
                'birth_date' => '2006-12-25',
                'gender' => 'female',
                'phone' => '+998907890123',
                'email' => 'dilnoza@example.com',
                'address' => 'Toshkent shahri, Yakkasaroy tumani',
                'parent_name' => 'Jamshid Umarov',
                'parent_phone' => '+998908901234',
                'status' => 'active',
                'notes' => 'San\'atkor o\'quvchi'
            ],
            [
                'first_name' => 'Bekzod',
                'last_name' => 'Yusupov',
                'middle_name' => 'Alisher o\'g\'li',
                'birth_date' => '2005-01-30',
                'gender' => 'male',
                'phone' => '+998909012345',
                'email' => 'bekzod@example.com',
                'address' => 'Toshkent shahri, Bektemir tumani',
                'parent_name' => 'Alisher Yusupov',
                'parent_phone' => '+998900123456',
                'status' => 'active',
                'notes' => 'Dizayner o\'quvchi'
            ]
        ];

        foreach ($students as $student) {
            $student['group_id'] = $groups->random()->id;
            Student::create($student);
        }
    }
} 