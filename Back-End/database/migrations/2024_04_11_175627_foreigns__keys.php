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
        Schema::table('subcategories', function (Blueprint $table) {
            $table->foreign('categorie_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('level_id')->references('id')->on('levels')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::table('tutorials', function (Blueprint $table) {
            $table->foreign('categorie_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::table('likes', function (Blueprint $table) {
            $table->foreign('tutorial_id')->references('id')->on('tutorials')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->foreign('tutorial_id')->references('id')->on('tutorials')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::table('signals', function (Blueprint $table) {
            $table->foreign('tutorial_id')->references('id')->on('tutorials')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::table('badges', function (Blueprint $table) {
            $table->foreign('level_id')->references('id')->on('levels')->onUpdate('cascade')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('subcategories', function (Blueprint $table) {
            $table->dropForeign(['categorie_id']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['level_id']);
        });

        Schema::table('tutorials', function (Blueprint $table) {
            $table->dropForeign(['categorie_id']);
            $table->dropForeign(['user_id']);
        });

        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['tutorial_id']);
            $table->dropForeign(['user_id']);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['tutorial_id']);
            $table->dropForeign(['user_id']);
        });

        Schema::table('signals', function (Blueprint $table) {
            $table->dropForeign(['tutorial_id']);
        });

        Schema::table('badges', function (Blueprint $table) {
            $table->dropForeign(['level_id']);
        });
    }
};
