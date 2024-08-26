<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cover extends Model
{
    use HasFactory;

    protected $table = 'covers';

    public function template(): HasOne
    {
        return $this->hasOne(CoverTemplate::class, 'id', 'cover_template_id');
    }

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class, 'id', 'cover_id');
    }
}
