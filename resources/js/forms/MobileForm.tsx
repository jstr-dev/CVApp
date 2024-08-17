import Input from '@/components/Input';
import { getUserContext } from '@/contexts/UserContext';
import React, { FormHTMLAttributes } from 'react';

interface MobileFormProps extends FormHTMLAttributes<HTMLFormElement> {
    errors?: MobileErrors
}

export default function MobileForm({ onSubmit, errors }: MobileFormProps) {
    const { user } = getUserContext();

    return (
        <form method="POST" name='onboardingForm' id='onboardingForm' onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input type="text" min="6" max="15" name="mobile_number" id="mobile_number" label="Mobile Number" required error={errors?.mobile_number} defaultValue={user?.mobile_number} />
            <Input type="number" maxLength={3} name="mobile_country_code" id='mobile_country_code' label="Country Code" error={errors?.mobile_country_code} defaultValue={user?.mobile_country_code} />
        </form>
    )
}
