<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(int $userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return self::notFound('User not found');
        }

        return self::success($user);
    }

    public function postUser(Request $request)
    {
        $validator = User::validateInput($request->all()); 

        if ($validator->fails()) {
            return self::badRequest('Invalid parameters passed', $validator->errors()->toArray());
        }

        if (User::where('email', $request->input('email'))->exists()) {
            return self::badRequest('User already exists');
        }

        $user = new User();
        $user->email = $request->input('email');
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->middle_name = $request->input('middle_name') ?? null;
        $user->password = Hash::make($request->input('password'));

        $addressInput = $request->input('address');
        if (isset($addressInput) && is_array($addressInput)) {
            $validator = Address::validateInput($addressInput);

            if ($validator->fails()) {
                return self::badRequest('Invalid Address', $validator->errors()->toArray());
            }

            $address = new Address();
            $address->first_line = $addressInput['first_line'];
            $address->second_line = $addressInput['second_line'] ?? null;
            $address->city = $addressInput['city'];
            $address->code = $addressInput['code'];
            $address->county = $addressInput['county'] ?? null;
            $address->country = $addressInput['country'];
            $address->save();

            $user->address_id = $address->getKey();
        }
        
        try {
            $user->save();
            return self::success($user); 
        } catch (\Exception $e) {
            return self::badRequest('Failed to create user');
        }
    }
}
