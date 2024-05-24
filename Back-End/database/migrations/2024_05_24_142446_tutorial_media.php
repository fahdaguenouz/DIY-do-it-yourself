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
        Schema::create('tutorial_media', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tutorial_id');
            $table->string('media_type'); // 'video' or 'photo'
            $table->string('media_url'); // path to the media file
            $table->text('description');
            $table->integer('order'); // to maintain the order of media items
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
