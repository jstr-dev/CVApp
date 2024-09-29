import BlockList, { Block } from '@/components/BlockList';
import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import TabMenu, { Tab } from '@/components/TabMenu';
import axiosInstance from '@/services/AxiosInstance';
import React, { useEffect, useState } from 'react';
import { l } from 'vite/dist/node/types.d-aGj9QkWt';

const Tabs : Tab[] = [
    { name: 'My Templates', content: <MyTemplates /> },
    { name: 'All Templates', content: <AllTemplates /> },
]

export default function Templates() {
    return (
        <div>
            <Heading title="Templates" /> 
            
            <Panel>
                <TabMenu tabs={Tabs} />
            </Panel>
        </div>
    )
}

function MyTemplates()
{
    const getTemplates = async () => {
        // const response = await axiosInstance.get('/templates'); 
    }

    const fakeBlocks : Block[] = [
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
        { name: 'Important Dog', img: ''},
    ]

    return (
        <BlockList blocks={fakeBlocks} />
    )
}

function AllTemplates()
{
    const [templates, setTemplates] = useState([] as Block[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await axiosInstance.get('/templates/defaults'); 
            console.log('thedata', response);
        }

        fetchTemplates();
        setLoading(false);
    }, []);

    if (!loading) {
       return <div>Loading...</div> 
    }

    return (
        <BlockList blocks={templates} />
    )
}