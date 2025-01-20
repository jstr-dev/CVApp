<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class FilterService
{
    public const FILTER_OPERATOR_LIKE = 1;
    public const FILTER_OPERATOR_EQUALS = 2;

    public static function createFiltersFromRequest(array $filterFields, Request $request)
    {
        $filters = [];

        foreach ($filterFields as $field => $settings) {
            foreach ($request->all() as $key => $value) {
                if ($key !== $field) continue;

                $filters[] = (object) [
                    'field' => isset($settings['field']) ? $settings['field'] : $field,
                    'val' => $value,
                    'operator' => isset($settings['operator']) ? $settings['operator'] : static::FILTER_OPERATOR_EQUALS,
                ];
            }
        }

        return $filters;
    }  

    public static function applyFiltersToQuery(Builder $query, array $filters): Builder
    {
        foreach ($filters as $filter) {
            if (is_array($filter->val)) {
                $query->whereIn($filter->field, $filter->val);
            } else {
                if ($filter->operator === static::FILTER_OPERATOR_LIKE) {
                    $filter->val = "%{$filter->val}%";
                }

                $query->where($filter->field, $filter->operator, $filter->val);
            }
        }

        return $query;
    }

    public static function getPaginationParameters(int $pageLimit, Request $request): array
    {
        $request->validate([
            'page' => 'integer|min:1',
            'page_limit' => 'integer|min:1|nullable',
        ]);

        return [
            $request->get('page', 1),
            $request->get('page_limit', $pageLimit),
        ];
    }

    public static function paginationResponse(Builder $query, int $page, int $pageLimit): object
    {
        $count = $query->count();
        $query = $query->skip(($page - 1) * $pageLimit)->take($pageLimit);
        $data = $query->get();

        return (object) ['count' => $count, 'results' => $data, 'page' => $page, 'pageLimit' => $pageLimit];
    }
}