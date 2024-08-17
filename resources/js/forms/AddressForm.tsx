import Input from '@/components/Input';
import React, { FormEventHandler } from 'react';

interface AddressFormProps extends React.FormHTMLAttributes<HTMLFormElement> {

}

export default function AddressForm({ onSubmit, ...props }: AddressFormProps) {
    return (
        <form name='addressForm' onSubmit={onSubmit}>
            <Input type="text" name="first_line" label="First Line" required />
            <Input type="text" name="second_line" label="Second Line" />
            <Input type="text" name="city" label="City" required />
            <Input type="text" name="county" label="County" />
            <Input type="text" name="country" label="Country" required />
            <Input type="text" name="postcode" label="Postcode" required />
        </form>
    )
}
