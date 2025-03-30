<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->date('birth_date');
            $table->enum('gender', ['male', 'female']);
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('parent_name')->nullable();
            $table->string('parent_phone')->nullable();
            $table->foreignId('group_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('status', ['active', 'inactive', 'graduated'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}; 