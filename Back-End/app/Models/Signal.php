<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signal extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutorial_id',
        'date',
        'reason',
    ];


    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }
}
