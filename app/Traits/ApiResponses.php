<?php

namespace App\Traits;

trait ApiResponses
{
    public static function response(int $code, bool $success, array | object | null $data = [], ?string $error = null)
    {
        return response()->json(array_filter([
            'success' => $success,
            'data' => $data,
            'error' => $error,
        ], fn ($x) => isset($x)))->setStatusCode($code);
    }

    public static function success(array | object | null $response = null)
    {
        return self::response(200, true, $response);
    }

    public static function badRequest(string $message = 'Bad Request', array | object | null $data = null)
    {
        return self::response(400, false, $data, $message);
    }

    public static function notFound(string $message = 'Not Found')
    {
        return self::response(404, false, null, $message);
    }

    public static function unauthorised(string $message = 'Unauthorised', array | object | null $data = null)
    {
        return self::response(401, false, $data, $message);
    }
}