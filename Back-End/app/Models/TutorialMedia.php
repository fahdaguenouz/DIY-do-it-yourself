<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorialMedia extends Model
{
    use HasFactory;

     // The attributes that are mass assignable
     protected $fillable = [
        'tutorial_id',
        'media_type',
        'media_url',
        'description',
        'order',
    ];

    // Define the relationship with the Tutorial model
    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }
}
