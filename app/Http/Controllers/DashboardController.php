<?php

namespace App\Http\Controllers;

use App\Models\Audit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $audits = Audit::where('user_id', $user->id)->latest()->take(10)->get();
        $scansThisMonth = $user->audits()->whereMonth('created_at', now()->month)->count();
        $remainingScans = max(0, 5 - $scansThisMonth);
        $stats = [
            'revenue' => '$' . number_format($user->audits()->where('status', 'malicious')->count() * 10, 2), // Mock revenue: $10 per malicious find
            'scans' => $user->audits()->count(),
        ];

        return Inertia::render('ProfitDashboard', [
            'stats' => $stats,
            'recent_audits' => $audits->map(function ($audit) {
                return [
                    'id' => $audit->id,
                    'url' => $audit->url,
                    'status' => ucfirst($audit->status),
                ];
            }),
            'remainingScans' => $remainingScans,
        ]);
    }

    public function scan(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $user = Auth::user();

        // Check free limit: 5 scans per month
        $scansThisMonth = $user->audits()->whereMonth('created_at', now()->month)->count();
        if ($scansThisMonth >= 5) {
            return redirect()->route('pricing')->with('error', 'Free limit reached. Upgrade to premium for unlimited scans.');
        }

        // Mock scanning: randomly assign status
        $status = rand(0, 1) ? 'safe' : 'malicious';

        $audit = Audit::create([
            'user_id' => $user->id,
            'url' => $request->url,
            'status' => $status,
        ]);

        return redirect()->route('dashboard')->with('success', 'URL scanned successfully.');
    }
}
