<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'teacher',
        'day',
        'startTime',
        'endTime',
        'room',
        'color',
        'notes',
    ];

    protected $casts = [
        'day' => 'integer',
        'startTime' => 'datetime',
        'endTime' => 'datetime',
    ];
} 