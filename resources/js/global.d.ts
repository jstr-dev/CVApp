interface User
{
    id: number,
    first_name: string,
    last_name: string,
    middle_name: string | null,
    email: string,
    onboarding_stage: 'address' | 'mobile' | 'finished';
}

type FormError = string | undefined | Array<string>;
