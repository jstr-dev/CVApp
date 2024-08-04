<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->prefix('user')->group(function () {
    // Route::get('/{userId}', 'getUser');
    Route::post('/', 'postUser');
});

Route::middleware(['web'])->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::get('user', 'user');
});

Route::get('test', function () {
    dd(auth()->user()->first_name);
})->middleware('auth:sanctum');