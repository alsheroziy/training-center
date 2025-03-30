<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::with('group')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhereHas('group', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $students = $query->paginate(10);

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        $groups = Group::select('id', 'name')->get();

        return Inertia::render('students/new-student', [
            'groups' => $groups,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'parent_name' => 'nullable|string|max:255',
            'parent_phone' => 'nullable|string|max:20',
            'group_id' => 'nullable|exists:groups,id',
            'status' => 'required|in:active,inactive,graduated',
            'notes' => 'nullable|string',
        ]);

        Student::create($validated);

        return redirect()->route('students.index')
            ->with('success', 'O\'quvchi muvaffaqiyatli qo\'shildi.');
    }

    public function edit(Student $student)
    {
        $groups = Group::select('id', 'name')->get();

        return Inertia::render('students/edit-student', [
            'student' => $student,
            'groups' => $groups,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:male,female',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'parent_name' => 'nullable|string|max:255',
            'parent_phone' => 'nullable|string|max:20',
            'group_id' => 'nullable|exists:groups,id',
            'status' => 'required|in:active,inactive,graduated',
            'notes' => 'nullable|string',
        ]);

        $student->update($validated);

        return redirect()->route('students.index')
            ->with('success', 'O\'quvchi ma\'lumotlari muvaffaqiyatli yangilandi.');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'O\'quvchi muvaffaqiyatli o\'chirildi.');
    }
} 