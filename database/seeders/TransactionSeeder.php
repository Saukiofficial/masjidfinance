<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $transactions = [
            // ===== JANUARI 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 15000000, 'description' => 'Donasi jamaah Jumat pertama', 'date' => '2026-01-09'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan Januari', 'date' => '2026-01-10'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 3200000, 'description' => 'Donasi via QRIS', 'date' => '2026-01-15'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 8750000, 'description' => 'Donasi jamaah Jumat kedua', 'date' => '2026-01-16'],
            ['category_id' => 5, 'type' => 'expense', 'amount' => 2500000, 'description' => 'Snack rapat panitia', 'date' => '2026-01-20'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 12000000, 'description' => 'Donasi jamaah Jumat ketiga', 'date' => '2026-01-23'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 4100000, 'description' => 'Transfer donasi online', 'date' => '2026-01-28'],
            ['category_id' => 10, 'type' => 'expense', 'amount' => 800000, 'description' => 'ATK dan administrasi', 'date' => '2026-01-29'],

            // ===== FEBRUARI 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 18500000, 'description' => 'Donasi jamaah Jumat', 'date' => '2026-02-06'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan Februari', 'date' => '2026-02-07'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 5600000, 'description' => 'Donasi online', 'date' => '2026-02-13'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 9200000, 'description' => 'Donasi jamaah Jumat kedua', 'date' => '2026-02-13'],
            ['category_id' => 4, 'type' => 'income', 'amount' => 25000000, 'description' => 'Sponsor utama acara Maulid', 'date' => '2026-02-17'],
            ['category_id' => 6, 'type' => 'expense', 'amount' => 5000000, 'description' => 'Sewa dekorasi panggung', 'date' => '2026-02-18'],
            ['category_id' => 7, 'type' => 'expense', 'amount' => 3500000, 'description' => 'Sewa sound system', 'date' => '2026-02-19'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 14000000, 'description' => 'Donasi jamaah Jumat ketiga', 'date' => '2026-02-20'],
            ['category_id' => 5, 'type' => 'expense', 'amount' => 15000000, 'description' => 'Konsumsi acara Maulid', 'date' => '2026-02-22'],
            ['category_id' => 8, 'type' => 'expense', 'amount' => 2000000, 'description' => 'Dokumentasi foto dan video', 'date' => '2026-02-22'],
            ['category_id' => 9, 'type' => 'expense', 'amount' => 1500000, 'description' => 'Transportasi undangan', 'date' => '2026-02-23'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 2800000, 'description' => 'Donasi online', 'date' => '2026-02-26'],
            ['category_id' => 10, 'type' => 'expense', 'amount' => 1200000, 'description' => 'Biaya lain-lain', 'date' => '2026-02-27'],

            // ===== MARET 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 11000000, 'description' => 'Donasi jamaah Jumat', 'date' => '2026-03-06'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan Maret', 'date' => '2026-03-07'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 3900000, 'description' => 'Donasi online', 'date' => '2026-03-12'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 7650000, 'description' => 'Donasi jamaah Jumat kedua', 'date' => '2026-03-13'],
            ['category_id' => 5, 'type' => 'expense', 'amount' => 1800000, 'description' => 'Snack pengajian rutin', 'date' => '2026-03-15'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 13200000, 'description' => 'Donasi jamaah Jumat ketiga', 'date' => '2026-03-20'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 4500000, 'description' => 'Transfer donasi', 'date' => '2026-03-25'],
            ['category_id' => 10, 'type' => 'expense', 'amount' => 600000, 'description' => 'Biaya administrasi', 'date' => '2026-03-28'],

            // ===== APRIL 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 9500000, 'description' => 'Donasi jamaah Jumat', 'date' => '2026-04-03'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan April', 'date' => '2026-04-04'],
            ['category_id' => 4, 'type' => 'income', 'amount' => 10000000, 'description' => 'Sponsor tambahan', 'date' => '2026-04-08'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 3700000, 'description' => 'Donasi online', 'date' => '2026-04-10'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 8400000, 'description' => 'Donasi jamaah', 'date' => '2026-04-17'],
            ['category_id' => 6, 'type' => 'expense', 'amount' => 2000000, 'description' => 'Dekorasi tambahan', 'date' => '2026-04-19'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 11000000, 'description' => 'Donasi jamaah', 'date' => '2026-04-24'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 5200000, 'description' => 'Donasi online', 'date' => '2026-04-28'],

            // ===== MEI 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 16200000, 'description' => 'Donasi jamaah Jumat', 'date' => '2026-05-01'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan Mei', 'date' => '2026-05-02'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 4800000, 'description' => 'Donasi online', 'date' => '2026-05-08'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 10300000, 'description' => 'Donasi jamaah', 'date' => '2026-05-15'],
            ['category_id' => 5, 'type' => 'expense', 'amount' => 2200000, 'description' => 'Konsumsi rapat evaluasi', 'date' => '2026-05-16'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 13800000, 'description' => 'Donasi jamaah', 'date' => '2026-05-22'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 3100000, 'description' => 'Donasi online', 'date' => '2026-05-27'],
            ['category_id' => 10, 'type' => 'expense', 'amount' => 950000, 'description' => 'Biaya lain-lain', 'date' => '2026-05-29'],

            // ===== JUNI 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 7800000, 'description' => 'Donasi jamaah Jumat', 'date' => '2026-06-05'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan Juni', 'date' => '2026-06-06'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 2900000, 'description' => 'Donasi online', 'date' => '2026-06-11'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 9200000, 'description' => 'Donasi jamaah', 'date' => '2026-06-12'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 11500000, 'description' => 'Donasi jamaah', 'date' => '2026-06-19'],
            ['category_id' => 5, 'type' => 'expense', 'amount' => 1200000, 'description' => 'Snack kegiatan', 'date' => '2026-06-20'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 3600000, 'description' => 'Donasi online', 'date' => '2026-06-25'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 6900000, 'description' => 'Donasi jamaah', 'date' => '2026-06-26'],

            // ===== JULI 2026 =====
            ['category_id' => 1, 'type' => 'income', 'amount' => 14500000, 'description' => 'Donasi jamaah Jumat', 'date' => '2026-07-03'],
            ['category_id' => 3, 'type' => 'income', 'amount' => 5000000, 'description' => 'Kas masjid bulan Juli', 'date' => '2026-07-04'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 4200000, 'description' => 'Donasi online', 'date' => '2026-07-09'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 9800000, 'description' => 'Donasi jamaah', 'date' => '2026-07-10'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 12800000, 'description' => 'Donasi jamaah', 'date' => '2026-07-17'],
            ['category_id' => 10, 'type' => 'expense', 'amount' => 1500000, 'description' => 'Biaya operasional', 'date' => '2026-07-18'],
            ['category_id' => 2, 'type' => 'income', 'amount' => 3800000, 'description' => 'Donasi online', 'date' => '2026-07-23'],
            ['category_id' => 1, 'type' => 'income', 'amount' => 7500000, 'description' => 'Donasi jamaah', 'date' => '2026-07-24'],
        ];

        foreach ($transactions as $t) {
            Transaction::create($t);
        }
    }
}
