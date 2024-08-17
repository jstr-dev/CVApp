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

Route::middleware('auth:sanctum')->controller(OnboardingController::class)->prefix('/onboarding')->group(function () {
   Route::post('/address', 'postAddress')->middleware('verifyOnboardingStage:address');
   Route::post('/mobile', 'postMobile')->middleware('verifyOnboardingStage:mobile');
});
