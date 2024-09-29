import React from 'react';
import Button from './Button';

const IMPORTANT_DOG_IMAGE = 'https://i.pinimg.com/564x/7f/26/e7/7f26e71b2c84e6b16d4f6d3fd8a58bca.jpg';

interface BlockListProps extends React.AllHTMLAttributes<HTMLDivElement>
{
    blocks: Block[];
}

export interface Block
{
    name: string;
    img?: string;
}

export function Block({name, img}: Block)
{
    return (
        <div className={'flex flex-col p-2 w-1/5 gap-2 ContentPanel rounded-lg'}>
            <img src={IMPORTANT_DOG_IMAGE} className={'w-full h-auto rounded-sm'} />
            <div className={'text-sm font-semibold'}>{name}</div>
            
            {/* Action Buttons */}
            <div className={'flex flex-row-reverse gap-2 mt-6'}>
                <Button icon='fa-pen-to-square' buttonStyle='secondary' size='small' />
                <Button icon='fa-trash' buttonStyle='secondary' size='small' />
            </div>
        </div>
    )
}

export default function BlockList({blocks}: BlockListProps)
{
    return (
        <div>
            {blocks.map((block, index) => (
                <Block key={index} name={block.name} img={block.img} />
            ))}
        </div>
    )
}