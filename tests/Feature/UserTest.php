<?php

namespace Tests\Feature;

use Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            "email" => "test@gmail.com",
            "password" => Hash::make("test"),
        ]);
    }

    public function test_user_login_success()
    {
        $response = $this->post('/api/login', [
            'email' => $this->user->email,
            'password' => "test",
        ]);

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($this->user);
    }

    public function test_invalid_credentials()
    {
        $response = $this->post('/api/login', [
            'email' => $this->user->email,
            'password' => "invalid",
        ]);

        $response->assertStatus(401);
        $this->assertGuest();
    }
}
