<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class FilterService
{
    public const FILTER_LIKE = 1;

    public static function createFiltersFromRequest(array $filterFields, Request $request)
    {
        $filters = [];

        foreach ($filterFields as $field => $settings) {
            foreach ($request->all() as $key => $value) {
                if ($key !== $field) continue;

                $filters[] = (object) [
                    'field' => isset($settings['field']) ? $settings['field'] : $field,
                    'val' => $value,
                    'operator' => isset($settings['operator']) ? $settings['operator'] : '=',
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
                if ($filter->operator === static::FILTER_LIKE) {
                    $filter->val = "%{$filter->val}%";
                }

                $query->where($filter->field, $filter->operator, $filter->val);
            }
        }

        return $query;
    }
}