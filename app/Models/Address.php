<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_line',
        'second_line',
        'code',
        'city',
        'county',
        'country',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'address_id', 'id');
    }
}
