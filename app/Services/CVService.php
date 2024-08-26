<?php

namespace App\Services;

use App\Models\CVTemplate;
use App\Models\User;
use App\Models\CV;

class CVService
{
    public function create(User $user, CVTemplate $template)
    {
        $cv = new CV();
        $cv->cv_template_id = $template->id; 
        $cv->user_id = $user->id;
        $cv->save();              
    }       
}