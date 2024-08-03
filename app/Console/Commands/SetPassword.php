<?php

namespace App\Console\Commands;

use App\Models\User;
use Hash;
use Illuminate\Console\Command;

class SetPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:set-password {--email=} {--password=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sets a users password';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email');
        $password = $this->option('password');
        
        $user = User::where('email', '=', $email)->first();
        if (!$user) {
            $this->error('No user found with that email, please try again.');
            return;
        }

        $user->password = Hash::make($password);
        $user->save();

        $this->info('Password set successfully!');
    }
}
