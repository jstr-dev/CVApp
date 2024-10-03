<?php

namespace App\Services;
use App\Exceptions\TemplateNotFoundException;
use App\Models\CVTemplate;
use Nette\NotImplementedException;
use View;

class TemplateService {
    private const DEFAULT_TEMPLATES = [
        'default' => [
            'name' => 'Default'
        ]
    ];

    public function render(string | CVTemplate $template): string 
    {
        if (is_string($template)) {
            if (!View::exists("templates.{$template}")) {
                throw new TemplateNotFoundException($template);
            } 

            return View::make("templates.{$template}", [
                'sanem' => 'booty'
            ])->render();
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
        $templates = array_map(function($template, $data) {
            return array_merge([
                'id' => $template,
                'view' => $this->render($template)
            ], $data);
        }, array_keys(self::DEFAULT_TEMPLATES), self::DEFAULT_TEMPLATES);

        return $templates;
    }
}