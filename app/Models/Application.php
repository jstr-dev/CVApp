<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Application extends Model
{
    use HasFactory;

    protected $table = 'applications';

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }

    public function cv(): HasOne 
    {
        return $this->hasOne(CV::class);
    }

    public function cover(): HasOne
    {
        return $this->hasOne(Cover::class);
    }
}
