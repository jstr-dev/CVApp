import BlockList, { Block } from '@/components/BlockList';
import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import TabMenu, { Tab } from '@/components/TabMenu';
import axiosInstance from '@/services/AxiosInstance';
import React, { useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Button';


const Tabs : Tab[] = [
    { name: 'My Templates', content: <MyTemplates /> },
    { name: 'All Templates', content: <AllTemplates /> },
]

export default function Templates() {
    return (
        <div>
            <div className='flex flex-row justify-between'>
                <Heading title="Templates" />
                <Button size="regular" buttonStyle="primary" icon="fa-plus" textClass='max-sm:hidden'>New</Button>
            </div>

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

function AllTemplates() {
    const fetchTemplates = async () => {
        const response = await axiosInstance.get('/templates/defaults')
            .then((res) => res.data.data);

        let _templates = [] as Block[];

        // Process each template and generate images
        for (const template of response) {
            let img = undefined;

            if (template.view) {
                // Create a temporary div to render HTML and capture as image
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template.view;
                document.body.appendChild(tempDiv);

                // Capture image using toPng and remove the temporary div
                img = await toPng(tempDiv, { quality: 1, width: 200, height: 200, fontEmbedCSS: '' });
                tempDiv.remove();
            }

            _templates.push({
                name: template.name,
                img: img,
                dateLastUsed: new Date()
            });
        }

        return _templates; // Return the processed templates array
    };

    const { data: templates = [], isLoading, isError } = useQuery({
        queryKey: ['templates'],
        queryFn: fetchTemplates,
        staleTime: 1000 * 60 * 5,
    });

    if (isError) {
        return <div>Error loading templates</div>;
    }

    return (
        <BlockList blocks={templates} loading={isLoading} />
    );
}
