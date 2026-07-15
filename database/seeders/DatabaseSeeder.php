<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Masjid',
            'email' => 'admin@masjid.test',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            CategorySeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
