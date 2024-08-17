import React from 'react';
import { getUserContext } from '../contexts/UserContext';

interface StepProps {
    name: string;
    description: string;
    active: boolean;
}

function Step({ name, description, active }: StepProps) {
    return (
        <div className={'mb-2'}>
            <p>NAME: {name}</p>
            <p>DESCRIPTION: {description}</p>
            <p>ACTIVE: {active ? 'TRUE' : 'FALSE'}</p>
        </div>
    );
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    const { user } = getUserContext();

    return (
        <div className="flex w-full h-full">
            <div className="h-full flex flex-col justify-center items-center max-lg:hidden w-2/5">
                <div className='steps'>
                    <Step name="Address" description="Enter your address" active={user?.onboarding_stage === 'address'} />
                    <Step name="Mobile" description="Enter your mobile number" active={user?.onboarding_stage === 'mobile'} />
                </div>
            </div>

            <div className="content-col flex flex-col justify-center items-center w-3/5 max-lg:w-full">
                {children}
            </div>
        </div>
    );
}
