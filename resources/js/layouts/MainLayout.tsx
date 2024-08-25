import Navbar from '@/components/Navbar';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row w-full h-full">
            <Navbar />

            <div className='content px-10 py-4 w-full'>
                {/* <div className='flex flex-col'>
                    <div className='text-xl semibold mb-1'>Title goes here</div>
                    <hr className='w-full h-[1px] bg-gray-800 mb-2' />
                </div> */}

                {children}
            </div>
        </div>
    );
}