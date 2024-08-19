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

    public function postBack(Request $request, UserService $userService)
    {
        $userService->decreaseOnboardingStage($request->user('sanctum'));
        return self::success(['previous_stage' => $request->user('sanctum')->onboarding_stage]);
    }

    public function postSkip(Request $request, UserService $userService)
    {
        $userService->iterateOnboardingStage($request->user('sanctum'));
        return self::success(['next_stage' => $request->user('sanctum')->onboarding_stage]);
    }

    public function postAddress(Request $request, AddressService $addressService, UserService $userService)
    {
        if (($validator = $addressService->validateInput($request->all())) && $validator->fails()) {
            return self::badRequest(data: $validator->errors()->toArray());
        }

        $addressService->create(
            user: $request->user('sanctum'),
            first_line: $request->first_line,
            second_line: $request->second_line,
            code: $request->code,
            city: $request->city,
            county: $request->county,
            country: $request->country
        );

        $userService->iterateOnboardingStage($request->user('sanctum'));

        return self::success(['next_stage' => $request->user('sanctum')->onboarding_stage]);
    }

    public function postMobile(Request $request, UserService $userService)
    {
        if (($validator = $userService->validateNumber($request->all())) && $validator->fails()) {
            return self::badRequest(data: $validator->errors()->toArray());
        }

        $userService->setMobileNumber(
            user: $request->user('sanctum'),
            countryCode: $request->mobile_country_code,
            number: $request->mobile_number
        );

        $userService->iterateOnboardingStage($request->user('sanctum'));

        return self::success(['next_stage' => $request->user('sanctum')->onboarding_stage]);
    }
}
