<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getStats(): array
    {
        $income = Transaction::where('type', 'income')->sum('amount');
        $expense = Transaction::where('type', 'expense')->sum('amount');
        $balance = $income - $expense;

        $incomeToday = Transaction::where('type', 'income')->whereDate('date', today())->sum('amount');
        $expenseToday = Transaction::where('type', 'expense')->whereDate('date', today())->sum('amount');

        $recentTransactions = Transaction::with('category')
            ->latest()
            ->take(10)
           ->get();

        $incomeByCategory = Transaction::where('type', 'income')
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->with('category')
            ->get();

        $expenseByCategory = Transaction::where('type', 'expense')
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->with('category')
            ->get();

        $monthly = Transaction::select(
            DB::raw("DATE_FORMAT(date, '%Y-%m') as month"),
            'type',
            DB::raw('SUM(amount) as total')
        )
            ->groupBy('month', 'type')
            ->orderBy('month')
            ->get()
            ->groupBy('month');

        return compact(
            'income', 'expense', 'balance',
            'incomeToday', 'expenseToday',
            'recentTransactions',
            'incomeByCategory', 'expenseByCategory',
            'monthly'
        );
    }
}
