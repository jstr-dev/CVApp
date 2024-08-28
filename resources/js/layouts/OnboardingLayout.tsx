import React from 'react';
import { getUserContext } from '../contexts/UserContext';
import {StepperContainer, StepperItem} from '../components/Stepper';
import Logo from '@/components/Logo';
import Button from '@/components/Button';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    const { user } = getUserContext();

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col gap-10 py-8 max-lg:hidden w-2/5 justify-between">
                <div className='flex flex-col px-20 gap-32'>
                    <Logo />

                    <StepperContainer>
                        <StepperItem
                            title="Provide your details"
                            description="Enter your address"
                            icon="fa-address-book"
                            active={user?.onboarding_stage === 'address'}
                            hasChild={true}
                        />

                        {/* TODO: This is temporary will merge in to the previous step */}
                        <StepperItem
                            title="Enter your phone number"
                            description="Temporary text"
                            active={user?.onboarding_stage === 'mobile'}
                            hasParent={true}
                            icon="fa-phone"
                        />
                    </StepperContainer>
                </div>
                <div className='px-10'>
                    <Button onClick={() => window.location.href = '/logout'} buttonStyle='secondary' className="nobg border-0" style={{boxShadow: 'none'}}>Logout</Button>
                </div>
            </div>

            <div className="content-col flex flex-col justify-between items-center w-3/5 max-lg:w-full relative py-8">
                {children}
            </div>
        </div>
    );
}
