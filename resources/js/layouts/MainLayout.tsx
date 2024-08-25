import Navbar from '@/components/Navbar';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex">
            <Navbar />

            <div className='content px-10 py-4 w-full'>
                {children}
            </div>
        </div>
    );
}