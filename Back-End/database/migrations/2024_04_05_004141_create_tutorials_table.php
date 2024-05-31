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
        Schema::create('tutorials', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->unsignedBigInteger('Sub_Categorie_id');
            $table->unsignedBigInteger('user_id');
            $table->string('cover')->nullable();
            $table->text('description');
            $table->string('status')->default('active');//status pour signals
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tutorials');
    }
};
