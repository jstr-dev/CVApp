import { getUserContext } from '@/contexts/UserContext';
import MobileForm from '@/forms/MobileForm';
import axiosInstance from '@/services/AxiosInstance';
import React, { useState } from 'react';

export default function MobileStep() {
    const [errors, setErrors] = useState<AddressErrors>();
    const { user, setUserProperty } = getUserContext();

    const MobileStepAction = async (event: any) => {
        event.preventDefault();

        const mobileNumber = event.target.mobile_number.value;
        const mobileCountryCode = event.target.mobile_country_code.value;

        await axiosInstance.post('/onboarding/mobile', {
            mobile_number: mobileNumber,
            mobile_country_code: mobileCountryCode,
        }).then((response) => {
            setUserProperty('onboarding_stage', response.data.data.next_stage);
            setUserProperty('address', {
                mobile_number: mobileNumber,
                mobile_country_code: mobileCountryCode,
            });
        }).catch((error) => {
            setErrors(error.response.data.data);
        });
    }

    return (
        <div className="w-full">
            <h1 className='mb-6 text-2xl font-semibold'>Enter your mobile number</h1>
            <MobileForm onSubmit={MobileStepAction} errors={errors} />
        </div>
    )
}
