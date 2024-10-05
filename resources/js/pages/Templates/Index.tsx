import BlockList, { Block } from './components/BlockList';
import Heading from '@/components/Heading';
import Panel from '@/components/Panel';
import TabMenu, { Tab } from '@/components/TabMenu';
import axiosInstance from '@/services/AxiosInstance';
import React, { useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/Button';


const Tabs: Tab[] = [
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

function MyTemplates() {
    const [loading, setLoading] = useState(false);
    const templates = [];

    const getTemplates = async () => {
    }

    if (!loading && templates.length === 0) {
        return (
            <div className="gap-4 flex flex-col w-full h-36 justify-center items-center">
                <div className="text-lg font-medium">You don't have any templates yet.</div>
                <Button size="regular" buttonStyle="secondary" textClass='max-sm:hidden'>New Template</Button>
            </div>
        )
    }

    return (
        <BlockList blocks={[]} loading={loading} />
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
        <BlockList blocks={templates} loading={isLoading} isDefault={true} />
    );
}
