import React, { useEffect, useState } from 'react';
import OnboardingLayout from '../layouts/OnboardingLayout';
import { getUserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

function Onboarding() {
    const { user } = getUserContext();

    useEffect(() => {
        if (user?.onboarding_stage === 'finished') {
            <Navigate to="/" />
        }
    }, [user?.onboarding_stage]);

    return (
        <OnboardingLayout>
            welcome to onboarding
        </OnboardingLayout>
    );
}

export default Onboarding;
