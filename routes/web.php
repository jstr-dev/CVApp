<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');

Route::get('login', function () {
    return view('index');
})->name('login');