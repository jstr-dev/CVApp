<?php

namespace App\Services;

use App\Exceptions\UserExistsException;
use App\Models\MobileExtension;
use App\Models\User;
use Hash;
use Illuminate\Support\Facades\Validator;

class UserService
{
    private const ONBOARDING_STAGES = ['address', 'mobile', 'finished'];

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

    public function validate(array $attributes, bool $appendConfirmation = false): \Illuminate\Validation\Validator
    {
        $validationArray = [
            'email' => 'required|email',
            'first_name' => 'required|string|min:2|max:255',
            'last_name' => 'required|string|min:2|max:255',
            'middle_name' => 'string|min:2|max:255',
            'password' => 'required|string|min:8|max:16',
            'mobile_number' => 'int',
            'address' => 'array',
        ];

        if ($appendConfirmation) {
            $validationArray['password_confirmation'] = 'same:password';
        }

        return Validator::make($attributes, $validationArray, [
            'password_confirmation.same' => 'The password confirmation does not match.',
        ]);
    }

    public function setMobileNumber(User $user, int $countryCode, string $number): void
    {
        $user->mobile_country_code = $countryCode;
        $user->mobile_number = $number;
        $user->save();
    }

    public function validateNumber(array $attributes): \Illuminate\Validation\Validator
    {
        return Validator::make($attributes, [
            'mobile_country_code' => ['required', 'integer', 'regex:/^\d{1,3}$/'],
            'mobile_number' => 'required|string|max:15|min:6',
        ]);
    }

    public function iterateOnboardingStage(User $user): void
    {
        $currentStageIndex = array_search($user->onboarding_stage, self::ONBOARDING_STAGES);

        if ($currentStageIndex === count(self::ONBOARDING_STAGES) - 1) {
            return;
        }

        $user->onboarding_stage = self::ONBOARDING_STAGES[$currentStageIndex + 1];
        $user->save();
    }

    public function decreaseOnboardingStage(User $user): void
    {
        $currentStageIndex = array_search($user->onboarding_stage, self::ONBOARDING_STAGES);

        if ($currentStageIndex === 0) {
            return;
        }

        $user->onboarding_stage = self::ONBOARDING_STAGES[$currentStageIndex - 1];
        $user->save();
    }
}
