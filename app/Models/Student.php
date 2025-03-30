<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'birth_date',
        'gender',
        'phone',
        'email',
        'address',
        'parent_name',
        'parent_phone',
        'group_id',
        'status',
        'notes'
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
} 