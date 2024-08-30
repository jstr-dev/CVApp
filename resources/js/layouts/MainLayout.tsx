import Navbar from '@/components/Navbar';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex">
            <Navbar />

            <div className='content w-full max-lg:pl-[80px] pl-[250px]'>
                <div className="w-full h-full container p-6 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
