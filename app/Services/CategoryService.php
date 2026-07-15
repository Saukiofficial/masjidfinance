<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return Category::query()
            ->when($filters['type'] ?? null, fn($q, $type) => $q->where('type', $type))
            ->when($filters['search'] ?? null, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(10);
    }

    public function find(int $id): Category
    {
        return Category::findOrFail($id);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(int $id, array $data): Category
    {
        $category = $this->find($id);
        $category->update($data);
        return $category;
    }

    public function delete(int $id): void
    {
        $category = $this->find($id);
        $category->delete();
    }

    public function getByType(string $type): array
    {
        return Category::where('type', $type)->get()->toArray();
    }
}
