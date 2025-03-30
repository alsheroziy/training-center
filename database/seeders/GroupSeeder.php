<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            [
                'name' => 'Frontend 1',
                'description' => 'Frontend dasturlash guruhi'
            ],
            [
                'name' => 'Backend 1',
                'description' => 'Backend dasturlash guruhi'
            ],
            [
                'name' => 'Fullstack 1',
                'description' => 'Fullstack dasturlash guruhi'
            ]
        ];

        foreach ($groups as $group) {
            Group::create($group);
        }
    }
} 