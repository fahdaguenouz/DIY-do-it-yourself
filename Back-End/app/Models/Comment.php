<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutorial_id',
        'user_id',
        'description',
    ];

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
