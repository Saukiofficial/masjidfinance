<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->name('landing');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::get('transactions/create/{type?}', [TransactionController::class, 'create'])->name('transactions.create');
    Route::resource('transactions', TransactionController::class)->except(['create']);

    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');

    Route::get('export/pdf', [ExportController::class, 'pdf'])->name('export.pdf');
    Route::get('export/excel', [ExportController::class, 'excel'])->name('export.excel');

    Route::get('nota', [NotaController::class, 'index'])->name('nota.index');
});

require __DIR__.'/auth.php';
