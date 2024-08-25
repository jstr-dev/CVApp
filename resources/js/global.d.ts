interface User
{
    id: number,
    first_name: string,
    last_name: string,
    middle_name: string | null,
    email: string,
    onboarding_stage: OnboardingStage;
    address?: Address,
    mobile_number?: string,
    mobile_country_code?: number
}

interface Address {
    first_line: string,
    second_line?: string,
    code: string,
    city: string,
    county?: string,
    country: string
}

type FormError = string | undefined | Array<string>;
type OnboardingStage = 'address' | 'mobile' | 'finished';

interface AddressErrors {
    first_line?: FormError,
    second_line?: FormError,
    code?: FormError,
    city?: FormError,
    county?: FormError,
    country?: FormError
}

interface MobileErrors {
    mobile_number?: FormError
    mobile_country_code?: FormError
}