import { getUserContext } from '@/contexts/UserContext';
import AddressForm from '@/forms/AddressForm';
import axiosInstance from '@/services/AxiosInstance';
import React, { useState } from 'react';

export default function AddressStep() {
    const [errors, setErrors] = useState<AddressErrors>();
    const { setUserProperty } = getUserContext();

    const AddressStepAction = async (event: any) => {
        event.preventDefault();
        console.log('yep!');
        console.log(event);

        const firstLine = event.target.first_line.value;
        const secondLine = event.target.second_line.value;
        const code = event.target.code.value;
        const city = event.target.city.value;
        const county = event.target.county.value;
        const country = event.target.country.value;

        await axiosInstance.post('/onboarding/address', {
            first_line: firstLine,
            second_line: secondLine,
            code: code,
            city: city,
            county: county,
            country: country
        }).then((response) => {
            setUserProperty('onboarding_stage', response.data.data.next_stage);
        }).catch((error) => {
            setErrors(error.response.data.data);
        });
    }

    return (
        <div className="w-full">
            <h1 className='mb-6 text-2xl font-semibold'>Enter your address</h1>
            <AddressForm onSubmit={AddressStepAction} errors={errors} />
        </div>
    )
}
