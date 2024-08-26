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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('first_line');
            $table->string('second_line')->nullable();
            $table->string('code');
            $table->string('city');
            $table->string('county')->nullable();
            $table->string('country');
            $table->timestamps();
        });
        
        Schema::create('mobile_extensions', function (Blueprint $table) {
            $table->id();
            $table->string('extension');
            $table->string('locale');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->string('first_name')->after('id');
            $table->string('last_name')->after('first_name');
            $table->bigInteger('address_id')->nullable()->after('last_name')->unsigned();
            $table->bigInteger('mobile_extension_id')->nullable()->after('address_id')->unsigned();
            $table->string('mobile_number')->nullable()->after('mobile_extension_id');
            $table->json('socials')->nullable()->after('mobile_number');

            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade');
            $table->foreign('mobile_extension_id')->references('id')->on('mobile_extensions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id');
            $table->dropForeign('users_address_id_foreign');
            $table->dropForeign('users_mobile_extension_id_foreign');
            $table->dropColumn([
                'first_name',
                'last_name',
                'address_id',
                'mobile_extension_id',
                'mobile_number',
                'socials',
            ]);
        });

        Schema::dropIfExists('addresses');
        Schema::dropIfExists('mobile_extensions');
    }
};
