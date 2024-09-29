import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import TabMenu, { Tab } from '@/components/TabMenu';
import React from 'react';

const Tabs : Tab[] = [
    { name: 'My Templates', content: <div>Templates</div> },
    { name: 'All Templates', content: <div>Templates</div> },
]

export default function Templates() {
    return (
        <div>
            <Heading title="Templates" /> 
            
            <Panel>
                <TabMenu tabs={Tabs}/>
            </Panel>
        </div>
    )
}