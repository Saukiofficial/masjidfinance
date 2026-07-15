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
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('panitia')->nullable()->after('description');
            $table->string('dusun')->nullable()->after('panitia');
            $table->integer('jumlah_donatur')->nullable()->after('dusun');
            $table->string('foto')->nullable()->after('jumlah_donatur');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['panitia', 'dusun', 'jumlah_donatur', 'foto']);
        });
    }
};
