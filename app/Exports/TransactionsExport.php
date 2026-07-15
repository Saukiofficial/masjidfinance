<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Transaction::with('category')
            ->when(request('type'), fn($q, $t) => $q->where('type', $t))
            ->when(request('date_from'), fn($q, $d) => $q->whereDate('date', '>=', $d))
            ->when(request('date_to'), fn($q, $d) => $q->whereDate('date', '<=', $d))
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return ['Tanggal', 'Tipe', 'Kategori', 'Jumlah', 'Keterangan', 'Lampiran'];
    }

    public function map($transaction): array
    {
        return [
            $transaction->date->format('d/m/Y'),
            $transaction->type === 'income' ? 'Pemasukan' : 'Pengeluaran',
            $transaction->category?->name ?? '-',
            number_format($transaction->amount, 2),
            $transaction->description ?? '-',
            $transaction->foto ? 'Ada' : '-',
        ];
    }
}
