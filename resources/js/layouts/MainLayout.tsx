import Navbar from '@/components/Navbar';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex">
            <Navbar />

            <div className='content p-6 w-full max-md:ml-[60px]'>
                {children}
            </div>
        </div>
    );
}