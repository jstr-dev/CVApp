<?php

namespace App\Console\Commands\Tests;

use App\Models\User;
use Illuminate\Console\Command;
use Password;

class ResetPassword extends Command
{
    protected $signature = 'test:reset-password-email {email}';

    protected $description = 'Send a test reset password email.';

    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', '=', $email)->first();
        $status = Password::sendResetLink(['email' => $user->email]);
        $this->info('Done.');
        $this->info($status);
    }
}
