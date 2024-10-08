<?php

namespace App\Services;

use App\Exceptions\UserExistsException;
use App\Models\Address;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AddressService {
    public function create(User $user, string $first_line, ?string $second_line, string $code, string $city, ?string $county, string $country): Address
    {
        $address = $user->address ?? new Address();
        $address->first_line = $first_line;
        $address->second_line = $second_line;
        $address->code = $code;
        $address->city = $city;
        $address->county = $county;
        $address->country = $country;
        $address->save();

        $user->address_id = $address->id;
        $user->save();

        return $address;
    }

    public static function validateInput(array $attributes)
    {
        return Validator::make($attributes, [
            'first_line' => 'required|string',
            'second_line' => 'string|nullable',
            'code' => 'required|string|max:10',
            'county' => 'string|nullable',
            'city' => 'required|string',
            'country' => 'required|string',
        ]);
    }
}
