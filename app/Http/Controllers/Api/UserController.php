<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\UserExistsException;
use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\User;
use App\Services\UserService;
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

    public function signup(UserService $userService, Request $request)
    {
        if (auth()->check()) {
            return self::forbidden();
        }

        $validator = $userService->validate($request->all(), true);

        if ($validator->fails()) {
            return self::badRequest(data: $validator->errors()->toArray());
        }

        try {
            $user = $userService->create(
                email: $request->email,
                password: $request->password,
                firstName: $request->first_name,
                lastName: $request->last_name,
                attributes: $request->all()
            );

            auth()->login($user);
            $request->session()->regenerate();

            return self::success($user);
        } catch (UserExistsException $exception) {
            return self::badRequest(data: ['email' => 'A user with that email already exists.']);
        }

        // TODO: create service & extract logic into there
        // $addressInput = $request->input('address');
        // if (isset($addressInput) && is_array($addressInput)) {
        //     $validator = Address::validateInput($addressInput);

        //     if ($validator->fails()) {
        //         return self::badRequest('Invalid Address', $validator->errors()->toArray());
        //     }

        //     $address = new Address();
        //     $address->first_line = $addressInput['first_line'];
        //     $address->second_line = $addressInput['second_line'] ?? null;
        //     $address->city = $addressInput['city'];
        //     $address->code = $addressInput['code'];
        //     $address->county = $addressInput['county'] ?? null;
        //     $address->country = $addressInput['country'];
        //     $address->save();

        //     $user->address_id = $address->getKey();
        // }
    }
}
