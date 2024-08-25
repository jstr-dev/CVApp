<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cv_templates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('cover_templates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('cvs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_template_id');
            $table->timestamps();
        });

        Schema::create('covers', function (Blueprint $table) {  
            $table->id();
            $table->foreignId('cover_template_id');
            $table->timestamps();
        });

        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('cv_id');
            $table->foreignId('cover_id');
            $table->enum('status', ['pending', 'declined', 'success', 'acknowledged'])->default('pending');
            $table->timestamps();
        });

        Schema::create('application_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id');
            $table->enum('event_type', ['created', 'acknowledged', 'declined', 'succeeded']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_events');
        Schema::dropIfExists('applications');
        Schema::dropIfExists('covers');
        Schema::dropIfExists('cvs');
        Schema::dropIfExists('cover_templates');
        Schema::dropIfExists('cv_templates');
    }
};
