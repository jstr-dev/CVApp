<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OnboardingController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => '/api'], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login')->middleware('guest');
        Route::post('logout', 'logout')->middleware('auth');
        Route::post('request-reset-link', 'requestResetLink')->middleware('guest');
        Route::get('reset-password', 'getResetPasswordToken')->middleware('guest');
        Route::post('reset-password', 'resetPassword')->middleware('guest');
        Route::get('user', 'getCurrentUser');
    });

    Route::middleware('guest')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::post('signup', 'signup');
        });
    });

    Route::middleware('auth')->group(function () {
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
            Route::get('/get', 'get');
        });
    });
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
