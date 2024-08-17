<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $rememberMe = $request->input('remember', false);
        $user = User::query()
            ->where('email', '=', $email)
            ->first();

        if (!$user) {
            return self::notFound(data:['email' => 'No user found with that email, please try again.']);
        }

        if (!auth()->attempt(['email' => $email, 'password' => $password], $rememberMe)) {
            return self::unauthorised(data:['password' => 'Incorrect password! Please try again.']);
        }

        $request->session()->regenerate();
        return self::success($request->user());
    }

    public function logout()
    {
        auth()->logout();
        return self::success();
    }
}
