import React, { useEffect } from 'react';
import OnboardingLayout from '../layouts/OnboardingLayout';
import { getUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import MobileStep from './partials/onboarding/MobileStep';
import AddressStep from './partials/onboarding/AddressStep';
import axiosInstance from '@/services/AxiosInstance';

const STAGE_MAP: Map<OnboardingStage, JSX.Element> = new Map([
    ['address', <AddressStep />],
    ['mobile', <MobileStep />]
]);

const getIndexByKey = (map: Map<OnboardingStage, JSX.Element>, key: OnboardingStage): number => {
    const entries = Array.from(map.entries());
    return entries.findIndex(([mapKey]) => mapKey === key);
};

function Onboarding() {
    const { user, setUserProperty } = getUserContext();
    const navigate = useNavigate();

    const goBack = async () => {
        await axiosInstance.post('/onboarding/back', {}).then((response) => {
            setUserProperty('onboarding_stage', response.data.data.previous_stage);
        });
    }

    useEffect(() => {
        if (user?.onboarding_stage === 'finished') {
            navigate('/')
        }
    }, [user?.onboarding_stage]);

    if (!user) {
        throw new Error('User not found');
    }

    return (
        <OnboardingLayout>
            <div className="w-[500px]">
                {STAGE_MAP.get(user.onboarding_stage)}

                <div className="flex flex-row justify-end mt-6 gap-4">
                    {getIndexByKey(STAGE_MAP, user.onboarding_stage) > 0 &&
                        <Button onClick={goBack}>Previous Stage</Button>
                    }

                    <Button type='submit' form='onboardingForm'>Next Stage</Button>
                </div>
            </div>
        </OnboardingLayout>
    );
}

export default Onboarding;
