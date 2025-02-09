<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'body'];


    // Filter
    public function scopeFilter($query, array $filters)
    {
        if (isset($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        return $query;
    }
}
