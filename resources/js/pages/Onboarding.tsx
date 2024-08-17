import React, { useEffect } from 'react';
import OnboardingLayout from '../layouts/OnboardingLayout';
import { getUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
    const { user } = getUserContext();
    const navigate = useNavigate();


    useEffect(() => {
        if (user?.onboarding_stage === 'finished') {
            navigate('/')
        }
    }, [user?.onboarding_stage]);

    return (
        <OnboardingLayout>
            welcome to onboarding
        </OnboardingLayout>
    );
}

export default Onboarding;
