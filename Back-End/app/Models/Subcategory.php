<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;
    protected $fillable = ['categorie_id', 'name', 'description', 'SubCategory_picture'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }
}
