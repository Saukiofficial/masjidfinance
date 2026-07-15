<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function __construct(private readonly CategoryService $categoryService) {}

    public function index(): Response
    {
        $categories = $this->categoryService->getAll(request()->only(['type', 'search']));
        return Inertia::render('Categories/Index', compact('categories'));
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Form', ['category' => null]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $this->categoryService->create($request->validated());
        return redirect()->route('categories.index')->with('success', 'Kategori berhasil dibuat.');
    }

    public function edit(int $id): Response
    {
        $category = $this->categoryService->find($id);
        return Inertia::render('Categories/Form', compact('category'));
    }

    public function update(CategoryRequest $request, int $id): RedirectResponse
    {
        $this->categoryService->update($id, $request->validated());
        return redirect()->route('categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->categoryService->delete($id);
        return redirect()->route('categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
