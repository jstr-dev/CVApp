<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AddressService;
use App\Services\UserService;
use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    private const ONBOARDING_STAGES = ['address', 'mobile', 'finished'];

    public function postAddress(Request $request, AddressService $addressService, UserService $userService)
    {
        $validator = $addressService->validateInput($request->all());

        if ($validator->fails()) {
            return self::badRequest(data: $validator->errors()->toArray());
        }

        $addressService->create(
            user: $request->user,
            first_line: $request->first_line,
            second_line: $request->second_line,
            code: $request->code,
            city: $request->city,
            county: $request->county,
            country: $request->country
        );

        $userService->iterateOnboardingStage($request->user);

        return self::success(['next_stage' => $request->user->onboarding_stage]);
    }

    public function postMobile()
    {

    }
}
