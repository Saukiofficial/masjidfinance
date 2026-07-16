<?php

namespace App\Services;

use App\Models\Transaction;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /** Valid chart periods and their day windows. */
    private const PERIODS = ['7d' => 7, '30d' => 30, '90d' => 90, '1y' => 365];

    public function getStats(string $period = '1y'): array
    {
        if (! array_key_exists($period, self::PERIODS)) {
            $period = '1y';
        }

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

        return compact(
            'income', 'expense', 'balance',
            'incomeToday', 'expenseToday',
            'recentTransactions',
            'incomeByCategory', 'expenseByCategory',
        ) + [
            'chart' => $this->getChartData($period),
            'period' => $period,
        ];
    }

    /**
     * Build chart-ready { labels, income, expense } for the given period.
     * 7d/30d -> daily buckets, 90d -> weekly buckets, 1y -> monthly buckets.
     */
    private function getChartData(string $period): array
    {
        return match ($period) {
            '7d' => $this->dailyChart(7),
            '30d' => $this->dailyChart(30),
            '90d' => $this->weeklyChart(90),
            default => $this->monthlyChart(),
        };
    }

    private function dailyChart(int $days): array
    {
        $start = today()->subDays($days - 1);
        $buckets = $this->dailyTotals($start);

        $labels = [];
        $income = [];
        $expense = [];

        foreach (CarbonPeriod::create($start, today()) as $date) {
            $key = $date->format('Y-m-d');
            $labels[] = $date->translatedFormat('d M');
            $income[] = (float) ($buckets[$key]['income'] ?? 0);
            $expense[] = (float) ($buckets[$key]['expense'] ?? 0);
        }

        return compact('labels', 'income', 'expense');
    }

    private function weeklyChart(int $days): array
    {
        $start = today()->subDays($days - 1);
        $buckets = $this->dailyTotals($start);

        $labels = [];
        $income = [];
        $expense = [];

        $cursor = $start->copy();
        $today = today();

        while ($cursor->lte($today)) {
            $weekEnd = $cursor->copy()->addDays(6);
            if ($weekEnd->gt($today)) {
                $weekEnd = $today->copy();
            }

            $weekIncome = 0;
            $weekExpense = 0;
            foreach (CarbonPeriod::create($cursor, $weekEnd) as $day) {
                $key = $day->format('Y-m-d');
                $weekIncome += $buckets[$key]['income'] ?? 0;
                $weekExpense += $buckets[$key]['expense'] ?? 0;
            }

            $labels[] = $cursor->translatedFormat('d M') . '-' . $weekEnd->translatedFormat('d M');
            $income[] = (float) $weekIncome;
            $expense[] = (float) $weekExpense;

            $cursor->addDays(7);
        }

        return compact('labels', 'income', 'expense');
    }

    private function monthlyChart(): array
    {
        $start = today()->subMonths(11)->startOfMonth();

        $rows = Transaction::select(
                DB::raw("DATE_FORMAT(date, '%Y-%m') as period_key"),
                'type',
                DB::raw('SUM(amount) as total')
            )
            ->whereDate('date', '>=', $start)
            ->groupBy('period_key', 'type')
            ->get()
            ->groupBy('period_key');

        $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        $labels = [];
        $income = [];
        $expense = [];

        $cursor = $start->copy();
        for ($i = 0; $i < 12; $i++) {
            $key = $cursor->format('Y-m');
            $bucket = $rows->get($key, collect());

            $labels[] = $monthNames[$cursor->month - 1];
            $income[] = (float) ($bucket->firstWhere('type', 'income')->total ?? 0);
            $expense[] = (float) ($bucket->firstWhere('type', 'expense')->total ?? 0);

            $cursor->addMonth();
        }

        return compact('labels', 'income', 'expense');
    }

    /**
     * Fetch income/expense totals grouped by calendar day from $start to today,
     * as ['Y-m-d' => ['income' => x, 'expense' => y]].
     */
    private function dailyTotals($start): array
    {
        $rows = Transaction::select(
                DB::raw('DATE(date) as period_key'),
                'type',
                DB::raw('SUM(amount) as total')
            )
            ->whereDate('date', '>=', $start)
            ->groupBy('period_key', 'type')
            ->get();

        $buckets = [];
        foreach ($rows as $row) {
            $buckets[$row->period_key][$row->type] = (float) $row->total;
        }

        return $buckets;
    }
}