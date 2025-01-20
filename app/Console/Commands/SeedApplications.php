<?php

namespace App\Console\Commands;

use App\Models\Application;
use App\Models\User;
use Illuminate\Console\Command;

class SeedApplications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:applications {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'For a given user, give them fake Job and Application records.';

    private const COUNT = 20;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = User::query()
            ->where('email', '=', $email)
            ->firstOrFail();

        Application::factory(self::COUNT)->create([
            'user_id' => $user->getKey(),
        ]);

        $this->info('Applications created.');
    }
}
