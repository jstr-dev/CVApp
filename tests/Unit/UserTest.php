<?php

namespace Tests\Unit;

use App\Http\Controllers\api\AuthController;
use App\Models\User;
use Auth;
use Hash;
use Mockery;
use Tests\TestCase;
use Request;
use App\Services\UserService;

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

    public function test_create_user_service_works()
    {
        $mockuserService = Mockery::mock(UserService::class);
        $mockuserService->shouldReceive('create')
            ->once()
            ->with('test@gmail.com', 'test', 'test', 'test')
            ->andReturn($this->user);

        $result = $mockuserService->create('test@gmail.com', 'test', 'test', 'test');
        $this->assertInstanceOf(User::class, $result);
    }
}
