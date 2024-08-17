import React, { useEffect } from 'react';
import OnboardingLayout from '../layouts/OnboardingLayout';
import { getUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Onboarding() {
    const { user, setUserProperty } = getUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.onboarding_stage === 'finished') {
            navigate('/')
        }
    }, [user?.onboarding_stage]);

    return (
        <OnboardingLayout>
            <Button onClick={() => {
                setUserProperty('onboarding_stage', user?.onboarding_stage === 'address' ? 'mobile' : 'address');
            }}>
                Test Button
            </Button>
        </OnboardingLayout>
    );
}

export default Onboarding;
