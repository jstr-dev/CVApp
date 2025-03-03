<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Password;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $rememberMe = $request->input('rememberMe', false);
        $user = User::query()
            ->where('email', '=', $email)
            ->first();

        if (!$user) {
            return self::notFound(data: ['email' => 'No user found with that email, please try again.']);
        }

        if (!auth()->attempt(['email' => $email, 'password' => $password], $rememberMe)) {
            return self::unauthorised(data: ['password' => 'Incorrect password! Please try again.']);
        }

        $request->session()->regenerate();
        return self::success($request->user());
    }

    public function logout()
    {
        auth()->logout();
        return self::success();
    }

    public function requestResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->get('email'))->first();

        if (!$user) {
            // Return success even if no user was found, prevents leaks.
            return self::success();
        }

        $status = Password::sendResetLink($request->only('email'));

        return self::success();
    }
}
