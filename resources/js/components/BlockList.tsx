import React from 'react';
import Button from './Button';
import Tooltip from './Tooltip';

const IMPORTANT_DOG_IMAGE = 'https://i.pinimg.com/564x/7f/26/e7/7f26e71b2c84e6b16d4f6d3fd8a58bca.jpg';
const FAKE_LAST_USED = new Date(2022, 1, 1);

interface BlockListProps extends React.AllHTMLAttributes<HTMLDivElement>
{
    blocks: Block[];
}

export interface Block
{
    name: string;
    img?: string;
    view?: string;
    dateLastUsed?: Date;
}

export function Block({name, img, view, dateLastUsed}: Block)
{
    return (
        <div className={'flex flex-col p-2 w-full gap-2 ContentPanel rounded-lg'}>
            {img ? <img src={IMPORTANT_DOG_IMAGE} className={'w-full h-auto rounded-lg'} /> : null}
            {view ? <iframe srcDoc={view}></iframe> : null}

            <div className={'text-sm font-semibold mt-2'}>{name}</div>
            
            <div className='flex flex-row mt-6 justify-between items-center'>
                <div className="relative group inline-block">
                    <button className={'text-xxs text-gray-700'} type="button">Last Used: {FAKE_LAST_USED?.toLocaleDateString()}</button>
                    <Tooltip text={'Last Used: ' + FAKE_LAST_USED?.toLocaleDateString()}/>
                </div>
                {/* Action Buttons */}
                <div className={'flex flex-row-reverse gap-2'}>
                    <Button icon='fa-pen-to-square' buttonStyle='secondary' size='small' />
                    <Button icon='fa-trash' buttonStyle='secondary' size='small' />
                </div>
            </div>
        </div>
    )
}

export default function BlockList({blocks}: BlockListProps)
{
    return (
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-5'>
            {blocks.map((block, index) => (
                <Block key={index} {...block} />
            ))}
        </div>
    )
}