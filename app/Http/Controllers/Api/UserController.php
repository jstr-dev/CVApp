<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\UserExistsException;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
    }
}
