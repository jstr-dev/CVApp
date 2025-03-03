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

    public function getResetPasswordToken(Request $request)
    {
        $request->validate(['token' => 'required', 'email' => 'required|email']);
        $token = $request->get('token');
        $email = $request->get('email');
        $user = Password::getUser(['email' => $email, 'token' => $token]);

        if (!$user) {
            return self::unauthorised(data: ['token' => 'Invalid token.']);
        }

        return self::success(['email' => $user->email]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return self::success();
        }

        return self::badRequest();
    }
}
