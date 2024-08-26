<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_mobile_extension_id_foreign');
            $table->dropColumn('mobile_extension_id');
            $table->integer('mobile_country_code')->nullable()->after('mobile_number');
        });

        Schema::dropIfExists('mobile_extensions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('mobile_extensions', function (Blueprint $table) {
            $table->id();
            $table->string('extension');
            $table->string('locale');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('mobile_country_code');
            $table->foreignId('mobile_extension_id');
        });
    }
};
