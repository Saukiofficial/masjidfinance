<?php

namespace App\Http\Controllers;

use App\Services\ReportService;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(private readonly ReportService $reportService) {}

    public function index(): Response
    {
        $data = $this->reportService->getSummary(
            request('date_from'),
            request('date_to')
        );
        return Inertia::render('Reports/Index', $data);
    }
}
