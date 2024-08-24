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

const StageLength = STAGE_MAP.size;

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

    const skip = async () => {
        await axiosInstance.post('/onboarding/skip', {}).then((response) => {
            setUserProperty('onboarding_stage', response.data.data.next_stage);
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
            <div className='absolute w-full top-8 flex justify-center gap-3'>
                {Array.from(STAGE_MAP).map((value, key) => (
                    <div className={'w-20 h-2 rounded-full transition bg-gray-300 ' + (user.onboarding_stage === value[0] ? 'bg-blue-400' : '')}></div>
                ))}
            </div>

            <div className="w-[500px]">
                {STAGE_MAP.get(user.onboarding_stage)}
            </div>

            <div className="absolute flex flex-row justify-between gap-2 bottom-8 w-full px-10">
                <Button type='button' onClick={skip} buttonStyle='secondary'>Skip Stage</Button>

                <div className="flex flex-row gap-2">
                    {getIndexByKey(STAGE_MAP, user.onboarding_stage) > 0 &&
                        <Button onClick={goBack} buttonStyle='secondary'>Previous Stage</Button>
                    }

                    <Button type='submit' form='onboardingForm' buttonStyle='secondary'>
                        {getIndexByKey(STAGE_MAP, user.onboarding_stage) === StageLength - 1 ? "Complete" : "Next Stage"}
                    </Button>
                </div>
            </div>
        </OnboardingLayout>
    );
}

export default Onboarding;
