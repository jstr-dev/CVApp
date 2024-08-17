<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    public function test_user_login_success()
    {
        $user = User::factory()->create([
            "email"=> "idk@gmail.com",
            "password"=> bcrypt("hi"),
        ]);

        $response = $this->post('/login', [
            'email'=> $user->email,
            'password'=> $user->password,
        ]);

        $response->assertStatus(200);
    }
}
