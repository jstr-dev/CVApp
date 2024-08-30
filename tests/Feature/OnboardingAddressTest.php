<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Address;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\DataProvider;

class OnboardingAddressTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            "email" => "test@gmail.com",
            "password" => Hash::make("test"),
            "onboarding_stage" => "address",
        ]);

        $this->post('/api/login', [
            'email' => $this->user->email,
            'password' => "test",
        ]);
    }

    #[DataProvider('address_valid_credentials_provider')]
    public function test_address_success($first_line, $second_line, $code, $city, $county, $country)
    {
        $response = $this->post("/api/onboarding/address", [
            "first_line" => $first_line,
            "second_line" => $second_line,
            "code" => $code,
            "city" => $city,
            "county" => $county,
            "country" => $country,
        ]);

        $response->assertStatus(200)
            ->assertJson(["data" => ["next_stage" => "mobile"]]);

        $this->assertDatabaseHas("addresses", [
            "first_line" => $first_line,
            "second_line" => $second_line ?: null,
            "code" => $code,
            "city" => $city,
            "county" => $county ?: null,
            "country" => $country,
        ]);
    }

    public static function address_valid_credentials_provider()
    {
        return [
            ["testfirstline", "testsecondline", "testcode", "testcity", "testcounty", "testcountry"],
            ["testfirstline", "", "testcode", "testcity", "testcounty", "testcountry"],
            ["testfirstline", "testsecondline", "testcode", "testcity", "", "testcountry"],
            ["testfirstline", "", "testcode", "testcity", "", "testcountry"],
        ];
    }

    #[DataProvider('address_invalid_credentials_provider')]
    public function test_address_invalid_credentials($first_line, $second_line, $code, $city, $county, $country)
    {
        $response = $this->post("/api/onboarding/address", [
            "first_line" => $first_line,
            "second_line" => $second_line,
            "code" => $code,
            "city" => $city,
            "county" => $county,
            "country" => $country,
        ]);

        $response->assertStatus(400);
    }

    public static function address_invalid_credentials_provider()
    {
        return [
            [null, "test", "test", "test", "test", "test"], // null first line
            ["test", "test", null, "test", "test", "test"], // null code
            ["test", "test", "test", "test", "test", null], // null country
            ["test", "test", "test", null, "test", "test"], // null city
        ];
    }
}