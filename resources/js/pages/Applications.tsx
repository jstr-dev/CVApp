import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import PanelCol from '@/components/PanelCol';
import PanelGrid from '@/components/PanelGrid';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import ApplicationList from './partials/applications/ApplicationList';
import Button from '@/components/Button';

function Applications()
{
    return (
        <>
            <div className='flex flex-row justify-between'>
                <Heading title="Your Applications" />
                <Button size="regular" buttonStyle="primary" icon="fa-plus" textClass='max-sm:hidden'>New</Button>
            </div>

            <PanelCol>
                <ApplicationList label="All Applications" />
            </PanelCol>
        </>
    )
}

export default Applications;
