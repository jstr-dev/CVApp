<?php

namespace Tests\Feature;

use Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_login_success()
    {
        $user = User::factory()->create([
            "email" => "test@gmail.com",
            "password" => Hash::make("test"),
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password'=> $user->password,
        ]);

        $response->assertStatus(200);
    }
}
