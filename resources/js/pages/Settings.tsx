import React, { useState } from 'react';
import Panel from '@/components/Panel';
import Heading from '@/components/Heading';
import { getUserContext } from '@/contexts/UserContext';
import TabMenu, { Tab } from '@/components/TabMenu';
import Heading2 from '@/components/Heading2';
import Icon from '@/icons/Icon';
import Button from '@/components/Button';
import Input from '@/components/Input';

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

function SectionHeader({ title, toggleEdit } : { title: string, toggleEdit: () => void }) {
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
 
    return (
        <>
            <Panel className='w-full h-full mx-auto max-md:w-full mb-6'>
                <SectionHeader title="Your information" toggleEdit={() => setIsEditing(!isEditing)} />
                {!isEditing ?                 
                    <div className="flex flex-wrap">
                      <div className="w-1/2 ml-0">
                        <div className='flex flex-col justify-between'>
                            
                        </div>
                      </div>
                      <div className="w-1/2 mr-auto">
                      </div>
                    </div>
                :
                    <div className='flex flex-col justify-between'>
                        <Input type='email'
                            id='email'
                            label='Email'
                            className= 'mb-3 w-1/2'
                            value={user?.email}
                            required={true}
                        />
                        <Input type='text'
                            id='first_name'
                            label='First name'
                            className= 'mb-3 w-1/2'
                            value={user?.first_name}
                            required={true}
                        />
                        {user?.middle_name && 
                            <Input type='text'
                            id='middle_name'
                            label='Middle name'
                            className= 'mb-3 w-1/2'
                            value={user?.middle_name}
                            required={true}
                            />
                        }
                        <Input type='text'
                            id='last_name'
                            label='Last name'
                            className= 'mb-3 w-1/2'
                            value={user?.last_name}
                            required={true}
                        />
                        
                        <EditButtons toggleEdit={() => setIsEditing(!isEditing)} />
                    </div> 
                }
            </Panel>
            <Panel className='w-full h-full mx-auto max-md:w-full mb-6'>
                <SectionHeader title="Your information" toggleEdit={() => setIsEditing(!isEditing)} />
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
