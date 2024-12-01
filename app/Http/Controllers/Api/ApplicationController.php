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
        [$page, $pageLimit] = FilterService::getPaginationParameters(20, $request);
        $filters = FilterService::createFiltersFromRequest([
            'status' => [],
        ], $request);

        $response = $applicationService->getApplicationsForUser($request->user(), $filters, $page, $pageLimit);

        return self::paginationResponse($response);
    }
}