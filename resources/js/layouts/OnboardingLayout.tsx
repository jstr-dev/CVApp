import React from 'react';
import { getUserContext } from '../contexts/UserContext';
import {StepperContainer, StepperItem} from '../components/Stepper';
import Logo from '@/components/Logo';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    const { user } = getUserContext();

    return (
        <div className="flex w-full h-full">
            <div className="h-full flex flex-col gap-10 py-20 px-20 max-lg:hidden w-2/5">
                <Logo />

                <StepperContainer>
                    <StepperItem 
                        title="Enter your address" 
                        description="Give us your address to start" 
                        active={user?.onboarding_stage === 'address'} 
                        hasChild={true}
                    />

                    <StepperItem 
                        title="Enter your phone number" 
                        description="Give us your phone number to start" 
                        active={user?.onboarding_stage === 'mobile'} 
                        hasParent={true}
                    />
                </StepperContainer>
            </div>

            <div className="content-col flex flex-col justify-center items-center w-3/5 max-lg:w-full relative">
                {children}
            </div>
        </div>
    );
}
