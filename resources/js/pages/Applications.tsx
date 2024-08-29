import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import PanelCol from '@/components/PanelCol';
import PanelGrid from '@/components/PanelGrid';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import ApplicationList from './partials/applications/ApplicationList';

function Applications()
{
    return (
        <>
            <Heading title="Your Applications" />

            <PanelCol>
                <ApplicationList label="All Applications" />
            </PanelCol>
        </>
    )
}

export default Applications;
