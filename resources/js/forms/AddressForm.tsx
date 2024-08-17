import Input from '@/components/Input';
import { getUserContext } from '@/contexts/UserContext';
import React, { FormHTMLAttributes } from 'react';

interface AddressFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    errors?: AddressErrors
}

export default function AddressForm({ onSubmit, errors }: AddressFormProps) {
    const { user } = getUserContext();

    return (
        <form method="POST" name='onboardingForm' id='onboardingForm' onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input type="text" name="first_line" id="first_line" label="First Line" required error={errors?.first_line} value={user?.address?.first_line} />
            <Input type="text" name="second_line" id='second_line' label="Second Line" error={errors?.second_line} value={user?.address?.second_line} />
            <Input type="text" name="city" id='city' label="City" required error={errors?.city} value={user?.address?.city} />
            <Input type="text" name="county" id='county' label="County" error={errors?.county} value={user?.address?.county} />
            <Input type="text" name="country" id='country' label="Country" required error={errors?.country} value={user?.address?.country} />
            <Input type="text" name="postcode" id='code' label="Postcode" required error={errors?.code} value={user?.address?.code} />
        </form>
    )
}
