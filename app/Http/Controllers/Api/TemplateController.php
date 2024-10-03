<?php 

namespace App\Http\Controllers\Api;
use App\Exceptions\TemplateNotFoundException;
use App\Http\Controllers\Controller;
use App\Services\TemplateService;
use Illuminate\Http\Request;

class TemplateController extends Controller {
    public function render(string $template, TemplateService $templateService) {
        // If the template is an integer, we assume it is an ID and check the DB, else it's a default one.
        if (is_int($template)) {
            try {
                $template = $templateService->find($template);
            } catch (TemplateNotFoundException $e) {
                return self::notFound();
            }
        } 

        return $templateService->render($template);
    }

    public function getDefaults(TemplateService $templateService) {
        return self::success($templateService->getDefaults());
    }
}