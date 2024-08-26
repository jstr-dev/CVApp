<?php

namespace App\Exceptions;

use Exception;

class InvalidStatusException extends Exception
{
    public function __construct(string $status)
    {
        parent::__construct("Invalid status: {$status}");
    }
}
