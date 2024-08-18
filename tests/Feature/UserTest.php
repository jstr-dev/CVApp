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

    /**
    * @dataProvider login_invalid_credentials_provider
    */
    public function test_login_invalid_credentials($email, $password, $statusCode)
    {
        $response = $this->post('/api/login', [
            'email' => $email,
            'password' => $password,
        ]);

        $response->assertStatus($statusCode);
        $this->assertGuest();
    }

    public static function login_invalid_credentials_provider()
    {
        return [
            ["wrongemail@gmail.com", "test", 404],
            ["test@gmail.com", "invalid", 401],
        ];
    }

    public function test_user_logout_success()
    {
        $response = $this->post('/api/logout');
        $response->assertStatus(200);
        $this->assertGuest();
    }

    public function test_user_signup_success()
    {
        $response = $this->post('/api/signup', [
            'email' => "test2@gmail.com",
            'password' => "testPassword",
            'password_confirmation' => "testPassword",
            'first_name' => "test",
            'last_name' => "test",
        ]);

        $response->assertStatus(200);
    }

    /**
    * @dataProvider signup_invalid_credentials_provider
    */
    public function test_signup_invalid_credentials($email, $password, $password_confirmation, $first_name, $last_name)
    {
        $response = $this->post('/api/signup', [
            'email' => $email, 
            'password' => $password,
            'password_confirmation' => $password_confirmation,
            'first_name' => $first_name,
            'last_name' => $last_name,
        ]);

        $response->assertStatus(400);
    }

    public static function signup_invalid_credentials_provider()
    {
        return [
            ["test@gmail.com", "testPassword", "testPassword", "test", "test"], // email exists
            ["test2@gmailcom", "test", "test", "test", "test"], // short password
            ["test2@gmailcom", "invalidLongPassword", "invalidLongPassword", "test", "test"], // long password
            ["test2@gmailcom", "testPassword", "testPassword", "t", "test"], // short first name
            ["test2@gmailcom", "testPassword", "testPassword", "test", "t"], // short last name
            ["test2@gmailcom", "mismatch", "testPassword", "test", "test"], //mismatch passwords
        ];
    }
}
