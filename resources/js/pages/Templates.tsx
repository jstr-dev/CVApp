import BlockList, { Block } from '@/components/BlockList';
import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import SkeletonBlock from '@/components/SkeletonBlock';
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
    const [loading, setLoading] = useState(true);

    const getTemplates = async () => {
        // const response = await axiosInstance.get('/templates'); 
    }

    const fakeBlocks : Block[] = [
        { name: 'Important Dog', img: 'a'},
        { name: 'Important Dog', img: 'b'},
        { name: 'Important Dog', img: 'c'},
        { name: 'Important Dog', img: 'd'},
        { name: 'Important Dog', img: 'e'},
        { name: 'Important Dog', img: 'f'},
        { name: 'Important Dog', img: 'g'},
        { name: 'Important Dog', img: 'h'},
        { name: 'Important Dog', img: 'i'},
        { name: 'Important Dog', img: 'j'},
        { name: 'Important Dog', img: 'k'},
    ]

    return (
        <BlockList blocks={fakeBlocks} loading={loading}/>
    )
}

function AllTemplates()
{
    const [templates, setTemplates] = useState([] as Block[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await axiosInstance.get('/templates/defaults')
                .then((res) => res.data.data);
            let _templates = [] as Block[];

            for (const template of response) {
                _templates.push({ name: template.name, img: '', view: template.view, dateLastUsed: new Date() });
            }

            console.log(_templates);

            setTemplates(_templates);
            setLoading(false);
        }

        fetchTemplates();
    }, []);

    //if (loading) {
        //return <div>Loading...</div>
    //}

    return (
        <BlockList blocks={templates} loading={loading}/>
    )
}