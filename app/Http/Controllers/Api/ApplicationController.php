<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ApplicationService;
use App\Services\FilterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function get(Request $request, ApplicationService $applicationService): JsonResponse 
    {
        $filters = FilterService::createFiltersFromRequest([
            'statuses' => ['field' => 'status', 'operator' => '='],
        ], $request);

        $response = $applicationService->getApplicationsForUser($request->user(), $filters);

        return self::paginationResponse($response);
    }
}