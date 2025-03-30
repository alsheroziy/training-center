<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonScheduleController extends Controller
{
    public function index()
    {
        $lessons = Lesson::all();

        return Inertia::render('lesson-schedule/index', [
            'lessons' => $lessons,
        ]);
    }

    public function create()
    {
        return Inertia::render('lesson-schedule/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'teacher' => 'required|string|max:255',
            'day' => 'required|integer|min:1|max:6',
            'startTime' => 'required|string',
            'endTime' => 'required|string',
            'room' => 'required|string|max:255',
            'color' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $lesson = Lesson::create($validated);

        return redirect()->route('lesson-schedule.index')
            ->with('success', 'Dars muvaffaqiyatli qo\'shildi.');
    }

    public function edit($id)
    {
        $lesson = Lesson::findOrFail($id);

        return Inertia::render('lesson-schedule/edit', [
            'lesson' => $lesson,
        ]);
    }

    public function update(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'teacher' => 'required|string|max:255',
            'day' => 'required|integer|min:1|max:6',
            'startTime' => 'required|string',
            'endTime' => 'required|string',
            'room' => 'required|string|max:255',
            'color' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $lesson->update($validated);

        return redirect()->route('lesson-schedule.index')
            ->with('success', 'Dars muvaffaqiyatli yangilandi.');
    }

    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return redirect()->route('lesson-schedule.index')
            ->with('success', 'Dars muvaffaqiyatli o\'chirildi.');
    }
} 