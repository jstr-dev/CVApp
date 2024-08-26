import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import PanelCol from '@/components/PanelCol';
import PanelGrid from '@/components/PanelGrid';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';

function Applications()
{
    return (
        <>
            <Heading title="Applications" />

            <PanelCol>
                <PanelGrid>
                    <Panel className='min-h-[200px]' loading>test</Panel>
                    <Panel>test</Panel>
                </PanelGrid>

                <Panel>
                    bad things
                </Panel>
            </PanelCol>
        </>
    )
}

export default Applications;