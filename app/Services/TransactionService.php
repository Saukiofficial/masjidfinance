<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class TransactionService
{
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return Transaction::with('category')
            ->when($filters['type'] ?? null, fn($q, $type) => $q->where('type', $type))
            ->when($filters['category_id'] ?? null, fn($q, $id) => $q->where('category_id', $id))
            ->when($filters['date_from'] ?? null, fn($q, $d) => $q->whereDate('date', '>=', $d))
            ->when($filters['date_to'] ?? null, fn($q, $d) => $q->whereDate('date', '<=', $d))
            ->when($filters['search'] ?? null, fn($q, $s) => $q->where(function($query) use ($s) {
                $query->where('description', 'like', "%{$s}%")
                      ->orWhere('panitia', 'like', "%{$s}%");
            }))
            ->latest()
            ->paginate(15);
    }

    public function find(int $id): Transaction
    {
        return Transaction::with('category')->findOrFail($id);
    }

    public function create(array $data): Transaction
    {
        if (isset($data['foto']) && $data['foto']) {
            $data['foto'] = $data['foto']->store('transactions', 'public');
        }
        return Transaction::create($data);
    }

    public function update(int $id, array $data): Transaction
    {
        $transaction = $this->find($id);
        if (isset($data['foto']) && $data['foto']) {
            if ($transaction->foto) {
                Storage::disk('public')->delete($transaction->foto);
            }
            $data['foto'] = $data['foto']->store('transactions', 'public');
        } else {
            unset($data['foto']);
        }
        $transaction->update($data);
        return $transaction;
    }

    public function delete(int $id): void
    {
        $transaction = $this->find($id);
        if ($transaction->foto) {
            Storage::disk('public')->delete($transaction->foto);
        }
        $transaction->delete();
    }
}
