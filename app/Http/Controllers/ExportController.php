<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TransactionsExport;
use Illuminate\Http\Response;

class ExportController extends Controller
{
    public function pdf(): Response
    {
        $transactions = Transaction::with('category')
            ->when(request('type'), fn($q, $t) => $q->where('type', $t))
            ->when(request('date_from'), fn($q, $d) => $q->whereDate('date', '>=', $d))
            ->when(request('date_to'), fn($q, $d) => $q->whereDate('date', '<=', $d))
            ->latest()
            ->get();

        $income = $transactions->where('type', 'income')->sum('amount');
        $expense = $transactions->where('type', 'expense')->sum('amount');

        $pdf = Pdf::loadView('exports.transactions', compact('transactions', 'income', 'expense'));
        return $pdf->download('laporan-keuangan.pdf');
    }

    public function excel(): Response
    {
        return Excel::download(new TransactionsExport, 'laporan-keuangan.xlsx');
    }
}
