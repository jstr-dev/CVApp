import React, { useState } from 'react';
import Panel from '@/components/Panel';
import Heading from '@/components/Heading';
import { getUserContext } from '@/contexts/UserContext';
import TabMenu, { Tab } from '@/components/TabMenu';
import Heading2 from '@/components/Heading2';
import Icon from '@/icons/Icon';
import Button from '@/components/Button';
import Input from '@/components/Input';
import DetailItem from '@/components/DetailItem';

const Tabs: Tab[] = [
    { 
        name: "Account", 
        content: [<AccountPanels />] 
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
            <TabMenu tabs={Tabs} className='w-2/3 mx-auto max-md:mx-0 max-md:w-full'/>
        </>
    );
}

function SectionHeader({ title, toggleEdit, isPanelOpen, togglePanel } : { title: string, toggleEdit: () => void, isPanelOpen: boolean, togglePanel: () => void }) {
    return (
        <div className="flex flex-row justify-between">
            <Heading2 title={title} />
            <Button icon="fa-pen" buttonStyle="secondary" size="small" onClick={toggleEdit}>Edit</Button>
        </div>
    );
}

function EditButtons({toggleEdit}: {toggleEdit: () => void}) {
    
    return (
        <div className='flex flex-row justify-end gap-3'>
            <Button buttonStyle="secondary" size="small" onClick={toggleEdit}>Cancel</Button>
            <Button buttonStyle="primary" size="small">Save</Button>
        </div>   
    )
}

function AccountPanels() {
    const { user, setUserProperty } = getUserContext();
    const [ isEditing, setIsEditing ] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
 
    return (
        <>
            <Panel className='w-full h-full mx-auto max-md:w-full mb-6'>
                <SectionHeader 
                    title="Your information" 
                    toggleEdit={() => setIsEditing(!isEditing)} 
                    isPanelOpen={isPanelOpen}
                    togglePanel={() => setIsPanelOpen(!isPanelOpen)}
                />
                {isPanelOpen &&
                    <div className="flex flex-wrap">
                      <div className="w-1/2 ml-0">
                        <div className='flex flex-col justify-between'>
                            <DetailItem 
                                label="First Name" 
                                value={user?.first_name} 
                                isEditing={isEditing} 
                                type='text' 
                                id='first_name' 
                            />
                            <DetailItem 
                                label="Email" 
                                value={user?.email} 
                                isEditing={isEditing} 
                                type='email' 
                                id='email' 
                            />
                            <DetailItem 
                                label="Mobile number" 
                                value={user?.mobile_number} 
                                isEditing={isEditing} 
                                type='number' 
                                id='mobile_number' 
                            />
                        </div>
                      </div>
                      <div className="w-1/2 mr-auto">
                        <div className='flex flex-col justify-between'>
                            <DetailItem 
                                label="Last Name" 
                                value={user?.last_name} 
                                isEditing={isEditing} 
                                type='text' 
                                id='last_name' 
                            />
                            <DetailItem 
                                label="Middle Name" 
                                value={user?.middle_name ?? undefined} 
                                isEditing={isEditing} 
                                type='text' 
                                id='middle_name' 
                            />
                            <DetailItem 
                                label="Mobile country code" 
                                value={user?.mobile_country_code} 
                                isEditing={isEditing} 
                                type='number' 
                                id='mobile_country_code' 
                            />
                        </div>
                      </div>
                    </div>
                }
                {!isEditing || isPanelOpen &&
                    <EditButtons toggleEdit={() => setIsEditing(!isEditing)} />
                }
            </Panel>
            <Panel className='w-full h-full mx-auto max-md:w-full mb-6'>

            </Panel>
        </>
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
