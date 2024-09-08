<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OnboardingController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['web'])->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout');
});

Route::middleware(['web'])->controller(UserController::class)->group(function () {
    Route::post('signup', 'signup');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(OnboardingController::class)->prefix('/onboarding')->group(function () {
        Route::post('/back', 'postBack');
        Route::post('/skip', 'postSkip');

        Route::post('/address', 'postAddress')->middleware('verify.onboarding:address');
        Route::post('/mobile', 'postMobile')->middleware('verify.onboarding:mobile');
    });

    Route::get('/applications/get', function () {
        sleep(2); // simulate slow network

        return response()->json(collect([
            [
                'created_at' => now()->format('Y-m-d'),
                'status' => 'pending',
                'job' => collect([
                    'company' => 'Google',
                    'salary' => '$100,000',
                    'title' => 'Full Stack Developer',
                ])
            ],
            [
                'created_at' => now()->subDay()->format('Y-m-d'),
                'status' => 'declined',
                'job' => collect([
                    'company' => 'Microsoft',
                    'salary' => '$90,000',
                    'title' => 'Frontend Developer',
                ])
            ],
            [
                'created_at' => now()->subDays(2)->format('Y-m-d'),
                'status' => 'success',
                'job' => collect([
                    'company' => 'Amazon',
                    'salary' => '$80,000',
                    'title' => 'Backend Developer',
                ])
            ],
            [
                'created_at' => now()->subDays(3)->format('Y-m-d'),
                'status' => 'acknowledged',
                'job' => collect([
                    'company' => 'Facebook',
                    'salary' => '$70,000',
                    'title' => 'Full Stack Developer',
                ])
            ],
            [
                'created_at' => now()->subDays(4)->format('Y-m-d'),
                'status' => 'pending',
                'job' => collect([
                    'company' => 'Twitter',
                    'salary' => '$60,000',
                    'title' => 'Frontend Developer',
                ])
            ],
            [
                'created_at' => now()->subDays(5)->format('Y-m-d'),
                'status' => 'declined',
                'job' => collect([
                    'company' => 'Apple',
                    'salary' => '$50,000',
                    'title' => 'Backend Developer',
                ])
            ],
        ]));
    });
});

