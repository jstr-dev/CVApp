<?php

namespace App\Exceptions;

use Exception;

class UserExistsException extends Exception
{
    public function __construct()
    {
        parent::__construct('User already exists');
    }
}
