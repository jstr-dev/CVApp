<?php
 
namespace App\Exceptions;
 
use Exception;

class TemplateNotFoundException extends Exception
{
    public function __construct(string $templateName)
    {
        parent::__construct("Template not found: {$templateName}");
    }
}
