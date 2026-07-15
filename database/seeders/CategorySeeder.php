<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Donasi Jamaah', 'type' => 'income', 'description' => 'Donasi dari jamaah masjid'],
            ['name' => 'Donasi Online', 'type' => 'income', 'description' => 'Donasi melalui transfer/QRIS'],
            ['name' => 'Kas Masjid', 'type' => 'income', 'description' => 'Pemasukan dari kas masjid'],
            ['name' => 'Sponsor', 'type' => 'income', 'description' => 'Sponsor dari pihak ketiga'],
            ['name' => 'Konsumsi', 'type' => 'expense', 'description' => 'Biaya konsumsi acara'],
            ['name' => 'Dekorasi', 'type' => 'expense', 'description' => 'Biaya dekorasi dan perlengkapan'],
            ['name' => 'Sound System', 'type' => 'expense', 'description' => 'Biaya sewa sound system'],
            ['name' => 'Dokumentasi', 'type' => 'expense', 'description' => 'Biaya foto dan video'],
            ['name' => 'Transportasi', 'type' => 'expense', 'description' => 'Biaya transportasi'],
            ['name' => 'Lain-lain', 'type' => 'expense', 'description' => 'Pengeluaran lainnya'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
