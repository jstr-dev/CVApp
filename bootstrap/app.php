<?php

use App\Http\Middleware\VerifyOnboardingStage;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
        $middleware->alias([
            'verify.onboarding' => VerifyOnboardingStage::class,
        ]);
        $middleware->trustHosts(['localhost', '127.0.0.1', 'cvapp.ddev.site']);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
