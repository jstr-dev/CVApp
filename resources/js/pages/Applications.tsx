import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import PanelGrid from '@/components/PanelGrid';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';

function Applications()
{
    return (
        <MainLayout>
            <Heading title="Applications" />

            <PanelGrid>
                <Panel>test</Panel>
                <Panel>test</Panel>
            </PanelGrid>
        </MainLayout>
    )
}

export default Applications;