<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class NotaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Nota/Index');
    }
}
