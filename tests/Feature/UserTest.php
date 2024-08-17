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

        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => "test",
        ]);

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($user);
    }

    public function test_invalid_credentials()
    {

    }
}
