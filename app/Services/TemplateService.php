<?php

namespace App\Services;
use App\Exceptions\TemplateNotFoundException;
use App\Models\CVTemplate;
use Nette\NotImplementedException;
use View;

class TemplateService {
    public function render(string|CVTemplate $template): string
    {
        if (is_string($template)) {
            if (!View::exists("templates.{$template}")) {
                throw new TemplateNotFoundException($template);
            }

            $templateData = config("templates.$template");

            return View::make("templates.{$template}", $templateData)->render();
        }

        throw new NotImplementedException();
    }

    public function find(int $id): CVTemplate
    {
        if (($template = CVTemplate::find($id)) && !$template) {
            throw new TemplateNotFoundException($id);
        }

        return $template;
    }

    public function getDefaults(): array
    {
        $defaults = config('templates');

        $templates = array_map(function($template, $data) {
            return array_merge([
                'id' => $template,
                'view' => $this->render($template)
            ], $data);
        }, array_keys($defaults), $defaults);

        return $templates;
    }
}
