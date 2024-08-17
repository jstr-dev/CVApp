<?php

namespace App\Services;

use App\Exceptions\UserExistsException;
use App\Models\User;
use Hash;
use Illuminate\Support\Facades\Validator;

class UserService
{
    public function create(string $email, string $password, string $firstName, string $lastName, ?array $attributes = null): User
    {
        if ($this->exists($email)) {
            throw new UserExistsException();
        }

        $user = new User();

        if ($attributes) {
            $user->fill($attributes);
        }

        $user->email = $email;
        $user->password = Hash::make($password);
        $user->first_name = $firstName;
        $user->last_name = $lastName;
        $user->save();

        return $user;
    }

    public function exists(string $email)
    {
        return User::query()
            ->where('email', '=', $email)
            ->exists();
    }

    public function validate(array $attributes): \Illuminate\Validation\Validator
    {
        return Validator::make($attributes, [
            'email' => 'required|email',
            'first_name' => 'required|string|min:2|max:255',
            'last_name' => 'required|string|min:2|max:255',
            'middle_name' => 'string|min:2|max:255',
            'password' => 'required|string|min:8|max:32',
            'mobile_number' => 'digit',
            'address' => 'array',
        ]);
    }
}
