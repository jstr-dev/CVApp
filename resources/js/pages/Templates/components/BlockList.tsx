import React from 'react';
import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import SkeletonBlock from './SkeletonBlock';

const FAKE_LAST_USED = new Date(2022, 1, 1);

interface BlockListProps extends React.AllHTMLAttributes<HTMLDivElement> {
    blocks: Block[];
    loading?: boolean;
    isDefault?: boolean;
}

export interface Block {
    name: string;
    img?: string;
    dateLastUsed?: Date;
    isDefault?: boolean;
}

export function Block({ name, img, dateLastUsed, isDefault }: Block) {
    return (
        <div className={'flex flex-col p-2 w-full gap-2 ContentPanel rounded-lg'}>
            {img ? <img src={img} className={'w-full h-auto rounded-lg border-2'} /> : null}

            <div className={'text-sm font-semibold mt-2'}>{name}</div>

            {!isDefault ?
                <div className='flex flex-row mt-6 justify-between items-center'>
                    <div className="relative group inline-block">
                        <button className={'text-xxs text-gray-700'} type="button">Last Used: {FAKE_LAST_USED?.toLocaleDateString()}</button>
                        <Tooltip text={'Last Used: ' + FAKE_LAST_USED?.toLocaleDateString()} />
                    </div>

                    {/* Action Buttons */}
                    <div className={'flex flex-row-reverse gap-2'}>
                        <Button icon='fa-pen-to-square' buttonStyle='secondary' size='small' />
                        <Button icon='fa-trash' buttonStyle='secondary' size='small' />
                    </div>
                </div>
                :
                <div className='flex flex-row mt-4'>
                    <Button className="w-full" buttonStyle='default'>Copy this template</Button>
                </div>
            }
        </div>
    )
}

export default function BlockList({ blocks, loading, isDefault }: BlockListProps) {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {loading ? (
                [...Array(blocks.length ? blocks.length : 4)].map((_, index) => <SkeletonBlock key={index} isDefault={isDefault} />)
            ) : (
                    blocks.map((block, index) => <Block key={index} {...block} isDefault={isDefault} />)
            )}
        </div>
    )
}
