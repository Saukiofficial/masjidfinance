<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function getSummary(string $startDate = null, string $endDate = null): array
    {
        $query = Transaction::query();
        if ($startDate) $query->whereDate('date', '>=', $startDate);
        if ($endDate) $query->whereDate('date', '<=', $endDate);

        $income = (clone $query)->where('type', 'income')->sum('amount');
        $expense = (clone $query)->where('type', 'expense')->sum('amount');

        $byCategory = Transaction::select('category_id', 'type', DB::raw('SUM(amount) as total'))
            ->when($startDate, fn($q) => $q->whereDate('date', '>=', $startDate))
            ->when($endDate, fn($q) => $q->whereDate('date', '<=', $endDate))
            ->groupBy('category_id', 'type')
            ->with('category')
            ->get();

        $daily = Transaction::select(DB::raw('DATE(date) as day'), 'type', DB::raw('SUM(amount) as total'))
            ->when($startDate, fn($q) => $q->whereDate('date', '>=', $startDate))
            ->when($endDate, fn($q) => $q->whereDate('date', '<=', $endDate))
            ->groupBy('day', 'type')
            ->orderBy('day')
            ->get()
            ->groupBy('day');

        $transactions = Transaction::with('category')
            ->when($startDate, fn($q) => $q->whereDate('date', '>=', $startDate))
            ->when($endDate, fn($q) => $q->whereDate('date', '<=', $endDate))
            ->latest()
            ->get();

        return compact('income', 'expense', 'byCategory', 'daily', 'transactions');
    }
}
