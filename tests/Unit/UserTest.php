<?php

namespace Tests\Unit;

use App\Http\Controllers\api\AuthController;
use App\Models\User;
use Auth;
use Hash;
use Tests\TestCase;
use Request;

class UserTest extends TestCase
{
    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->make([
            "email" => "test@gmail.com",
            "password" => Hash::make("test"),
        ]);
    }

    public function test_user_login_success()
    {
        $this->assertTrue(true);

        $request = Request::create('/login', 'POST', [
            'email' => $this->user->email,
            'password' => 'password123',
        ]);

        Auth::shouldReceive('attempt')
        ->once()
        ->with(['email' => $this->user->email, 'password' => 'password123'], false)
        ->andReturn(true);

        Auth::shouldReceive('user')->once()->andReturn($this->user);


        // Step 4: Call the login method and get the response
        $response = (new AuthController())->login($request);

        // Step 5: Assert the response is successful
        $response->assertOk();
    }
}
