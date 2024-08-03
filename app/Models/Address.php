<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Validator;

class Address extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'address_id', 'id');
    }

    public static function validateInput(array $attributes)
    {
        return Validator::make($attributes, [
            'first_line' => 'required|string',
            'second_line' => 'string',
            'code' => 'required|string|max:10',
            'county' => 'string',
            'city' => 'required|string',
            'country' => 'required|string',
        ]);
    }
}
