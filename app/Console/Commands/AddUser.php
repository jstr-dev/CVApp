<?php

namespace App\Console\Commands;

use App\Services\UserService;
use Exception;
use Illuminate\Console\Command;

class AddUser extends Command
{
    protected $signature = 'user:add';
    protected $description = 'Adds a new user';
    protected UserService $userService;

    public function __construct()
    {
        parent::__construct();

        $this->userService = new UserService();
    }

    public function handle()
    {
        $email = $this->ask('Email');
        $password = $this->secret('Password');
        $firstName = $this->ask('First name');
        $middleName = $this->ask('Middle name (leave blank for NULL)');
        $lastName = $this->ask('Last name');

        try {
            $user = $this->userService->create($email, $password, $firstName, $lastName, array_filter([
                'middle_name' => $middleName,
            ]));

            $this->info($user->email . ' added successfully!');
        } catch (Exception $ex) {
            $this->error($ex->getMessage());
        }
    }
}
