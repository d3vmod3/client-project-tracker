<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Projects Page
    Route::get('/projects', function () {
        return inertia('projects/index');
    })->name('projects.index');

    Route::get('/projects/create', function () {
        return inertia('projects/create');
    })->name('projects.create');

    Route::get('/projects/{project}/edit', function () {
        return inertia('projects/edit');
    })->name('projects.edit');
});

require __DIR__.'/settings.php';
