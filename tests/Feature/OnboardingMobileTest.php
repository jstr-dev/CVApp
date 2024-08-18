<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Address;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class OnboardingMobileTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            "email" => "test@gmail.com",
            "password" => Hash::make("test"),
            "onboarding_stage" => "mobile",
        ]);

        $this->post('/api/login', [
            'email' => $this->user->email,
            'password' => "test",
        ]);
    }

    public function test_mobile_number_success()
    {
        $this->assertDatabaseHas("users", [
            "onboarding_stage" => "mobile",
        ]);

        $response = $this->post("/api/onboarding/mobile", [
            "mobile_number" => "1234567890",
            "mobile_country_code" => "123",
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    "data" => ["next_stage" => "finished",
        ]]);

        $this->assertDatabaseHas("users", [
            "mobile_number" => "1234567890",
            "mobile_country_code" => "123",
        ]);
    }

    /**
     * @dataProvider mobile_number_invalid_credentials_provider
     */
    public function test_mobile_number_invalid_credentials($mobile_number, $mobile_country_code)
    {
        $response = $this->post("/api/onboarding/mobile", [
            "mobile_number" => "$mobile_number",
            "mobile_country_code" => "$mobile_country_code",
        ]); 

        $response->assertStatus(400);
    }

    public static function mobile_number_invalid_credentials_provider()
    {
        return [
            ["123", "123"], // short mobile number
            ["123456789012345678901234567890", "1234"], // long mobile number
            ["1234567890", "12345123"], // long mobile country code
        ];
    }
}