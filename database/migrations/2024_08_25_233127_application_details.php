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
        Schema::table('applications', function (Blueprint $table) {
            $table->string('job_description')->nullable();
            $table->string('job_title');
            $table->string('company_name')->nullable();
            $table->string('company_description')->nullable();
            $table->string('platform');
            $table->string('url');
            $table->bigInteger('cover_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('your_table_name', function (Blueprint $table) {
            $table->dropColumn('job_description');
            $table->dropColumn('job_title');
            $table->dropColumn('company_name');
            $table->dropColumn('company_description');
            $table->dropColumn('platform');
            $table->dropColumn('url');
            $table->bigInteger('cover_id')->nullable(false)->change();
        });
    }
};
