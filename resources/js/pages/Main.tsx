import React from 'react';
import { getUserContext } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Panel from '@/components/Panel';
import Heading from '@/components/Heading';

function Main() {
    const { user } = getUserContext();

    return (
        <MainLayout>
            <Heading headingName='Dashboard'/>
            <Panel>this is a panel</Panel>
        </MainLayout>
    );
}

export default Main;
