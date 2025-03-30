<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LessonScheduleController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/statistics', function () {
        return Inertia::render('statistics/statistics');
    })->name('statistics');

    Route::get('/courses', function () {
        return Inertia::render('courses/courses');
    })->name('courses');

    Route::get('/courses/new', function () {
        return Inertia::render('courses/new-course');
    })->name('courses.new');

    Route::get('/courses/{id}', function ($id) {
        return Inertia::render('courses/course-details', ['id' => $id]);
    })->name('courses.details');

    Route::get('/courses/{id}/edit', function ($id) {
        return Inertia::render('courses/edit-course', ['id' => $id]);
    })->name('courses.edit');

    Route::get('/teachers', function () {
        return Inertia::render('teachers/teachers');
    })->name('teachers');

    Route::get('/teachers/new', function () {
        return Inertia::render('teachers/new-teacher');
    })->name('teachers.new');

    Route::get('/students', function () {
        return Inertia::render('students/students');
    })->name('students');

    Route::get('/students/new', function () {
        return Inertia::render('students/new-student');
    })->name('students.new');

    Route::get('/payments', function () {
        return Inertia::render('payments/payment');
    })->name('payments');

    Route::get('/payments/new', function () {
        return Inertia::render('payments/new-payment');
    })->name('payments.new');

    // Lesson Schedule Routes
    Route::get('/lesson-schedule', [LessonScheduleController::class, 'index'])->name('lesson-schedule.index');
    Route::get('/lesson-schedule/create', [LessonScheduleController::class, 'create'])->name('lesson-schedule.create');
    Route::post('/lesson-schedule', [LessonScheduleController::class, 'store'])->name('lesson-schedule.store');
    Route::get('/lesson-schedule/{id}/edit', [LessonScheduleController::class, 'edit'])->name('lesson-schedule.edit');
    Route::put('/lesson-schedule/{id}', [LessonScheduleController::class, 'update'])->name('lesson-schedule.update');
    Route::delete('/lesson-schedule/{id}', [LessonScheduleController::class, 'destroy'])->name('lesson-schedule.destroy');

    // Student routes
    Route::resource('students', StudentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
