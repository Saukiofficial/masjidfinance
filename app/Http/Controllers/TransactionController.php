<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Services\CategoryService;
use App\Services\TransactionService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class TransactionController extends Controller
{
    public function __construct(
        private readonly TransactionService $transactionService,
        private readonly CategoryService $categoryService,
    ) {}

    public function index(): Response
    {
        $transactions = $this->transactionService->getAll(request()->only(['type', 'category_id', 'date_from', 'date_to', 'search']));
        return Inertia::render('Transactions/Index', compact('transactions'));
    }

    public function create(string $type = 'income'): Response
    {
        $categories = $this->categoryService->getByType($type);
        return Inertia::render('Transactions/Form', [
            'transaction' => null,
            'categories' => $categories,
            'type' => $type,
        ]);
    }

    public function store(TransactionRequest $request): RedirectResponse
    {
        $this->transactionService->create($request->validated());
        $type = $request->type === 'income' ? 'Pemasukan' : 'Pengeluaran';
        return redirect()->route('transactions.index')->with('success', "{$type} berhasil dicatat.");
    }

    public function edit(int $id): Response
    {
        $transaction = $this->transactionService->find($id);
        $categories = $this->categoryService->getByType($transaction->type);
        return Inertia::render('Transactions/Form', compact('transaction', 'categories'));
    }

    public function update(TransactionRequest $request, int $id): RedirectResponse
    {
        $this->transactionService->update($id, $request->validated());
        return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil diperbarui.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->transactionService->delete($id);
        return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil dihapus.');
    }
}
