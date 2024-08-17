<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyOnboardingStage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $stage): Response
    {
        if ($request->user()->onboarding_stage !== $stage) {
            return response()->json(['message' => 'Invalid onboarding stage.'], 403);
        }

        return $next($request);
    }
}
