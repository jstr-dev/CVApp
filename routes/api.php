<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::get('/{userId}', 'getUser');
    Route::post('/', 'postUser');
});

Route::middleware(['web'])->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
});

Route::get('test', function () {
    dd(auth()->user()->first_name);
})->middleware('auth:sanctum');