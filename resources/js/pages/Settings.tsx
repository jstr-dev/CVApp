import React from 'react';
import Panel from '@/components/Panel';
import Heading from '@/components/Heading';
import { getUserContext } from '@/contexts/UserContext';
import TabMenu, { Tab } from '@/components/TabMenu';
import Heading2 from '@/components/Heading2';

const Tabs: Tab[] = [
    { 
        name: "Account", 
        content: [<AccountPanel0 />, <AccountDetails />] 
    },
    { 
        name: "General", 
        content: [<GeneralPanel0 />] 
    },
    { 
        name: "Privacy", 
        content: [<PrivacyPanel0 />] 
    }
];

function SettingsDetails() {
    return (          
        <> 
            <Heading className='w-2/3 mx-auto max-md:mx-0 max-md:w-full' title="Settings" />
            <Panel className='w-2/3 h-full mx-auto max-md:w-full mb-6'>
                <TabMenu tabs={Tabs} />
            </Panel>

            <Panel className='w-2/3 h-full mx-auto max-md:w-full'>
                <h1>Settings</h1>
            </Panel>
        </>
    );
}

function AccountPanel0() {
    const { user, setUserProperty } = getUserContext();

    return (
        <div>
            <Heading2 title = "Your information" />
            <div className='flex flex-row justify-between'>
                <p>Email: {user?.email}</p>
                <p>Name: {user?.first_name} {user?.middle_name} {user?.last_name}</p>
            </div>
        </div>
    );
}

function AccountDetails() {
    return (
        <div>
            <h1>Account Details</h1>
        </div>
    );
}

function GeneralPanel0() {
    return (
        <div>
            <h1>General</h1>
        </div>
    );
}

function PrivacyPanel0() {
    return (
        <div>
            <h1>Privacy</h1>
        </div>
    );
}

export default SettingsDetails;
