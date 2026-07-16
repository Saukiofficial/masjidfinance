<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $dashboardService) {}

    public function index(Request $request): Response
    {
        $period = $request->query('period', '1y');
        $stats = $this->dashboardService->getStats($period);
        return Inertia::render('Dashboard', $stats);
    }
}