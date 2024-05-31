<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutorial extends Model
{
    use HasFactory;
    // The attributes that are mass assignable
    protected $fillable = [
        'titre',
        'Sub_Categorie_id',
        'user_id',
        'cover',
        'description',
        'status',
    ];

    // Define the relationship with the TutorialMedia model
    public function media()
    {
        return $this->hasMany(TutorialMedia::class);
    }

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the SubCategory model
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'Sub_Categorie_id');
    }

    public function signals()
    {
        return $this->hasMany(Signal::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
