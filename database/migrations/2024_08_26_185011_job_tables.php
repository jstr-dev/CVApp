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
        Schema::create('app_jobs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('description');
            $table->string('currency');
            $table->integer('salary')->nullable();
            $table->integer('salary_interval')->nullable();
            $table->string('url')->nullable();
            $table->string('platform')->index();
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('skill');
            $table->boolean('essential');
            $table->bigInteger('job_id')->unsigned();
            $table->foreign('job_id')->references('id')->on('app_jobs')->onDelete('cascade');
        });

        Schema::create('job_keywords', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('keyword');
            $table->integer('frequency');
            $table->bigInteger('job_id')->unsigned();
            $table->foreign('job_id')->references('id')->on('app_jobs')->onDelete('cascade');
        });

        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn('job_title');
            $table->dropColumn('job_description');
            $table->bigInteger('job_id')->unsigned()->after('cover_id');
            $table->foreign('job_id')->references('id')->on('app_jobs');
        });            
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function(Blueprint $table) {
            $table->string('job_description')->nullable()->after('status');
            $table->string('job_title')->after('job_description');
            $table->dropForeign('applications_job_id_foreign');
         });

        Schema::dropIfExists('job_keywords');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('app_jobs');
    }
};
