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
            $table->string('job_description')->nullable()->after('status');
            $table->string('job_title')->after('job_description');
            $table->string('company_name')->nullable()->after('job_title');
            $table->string('company_description')->nullable()->after('company_name');
            $table->string('platform')->after('company_description');
            $table->string('url')->after('platform');
            $table->bigInteger('cover_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
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
