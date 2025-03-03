<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OnboardingController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['web'])->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->middleware('guest:sanctum');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
    Route::post('request-reset-link', 'requestResetLink')->middleware('guest:sanctum');
    Route::get('reset-password', 'getResetPasswordToken')->middleware('guest:sanctum');
    ROute::post('reset-password', 'resetPassword')->middleware('guest:sanctum');
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

    Route::controller(TemplateController::class)->prefix('/templates')->group(function () {
        Route::get('/render/{template}', 'render');
        Route::get('/defaults', 'getDefaults');
    });

    Route::controller(ApplicationController::class)->prefix('/applications')->group(function () {
        // Route::post('/create', 'create');
        Route::get('/get', 'get');
    });
});

