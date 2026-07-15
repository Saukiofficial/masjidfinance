<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function index(): Response
    {
        $income = Transaction::where('type', 'income')->sum('amount');
        $expense = Transaction::where('type', 'expense')->sum('amount');
        $balance = $income - $expense;
        $count = Transaction::count();

        $recentTransactions = Transaction::with('category')
            ->latest()
            ->take(10)
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

        $topIncomeCategories = Transaction::where('type', 'income')
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->with('category')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        return Inertia::render('LandingPage', compact(
            'income', 'expense', 'balance', 'count',
            'recentTransactions', 'monthly', 'topIncomeCategories'
        ));
    }
}
