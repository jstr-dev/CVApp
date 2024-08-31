import { NavbarSide, NavbarTop } from '@/components/Navbar';
import { TAILWIND_BP } from '@/constants';
import React, { useEffect, useState } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < TAILWIND_BP.sm);
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < TAILWIND_BP.sm);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className="w-full h-full flex flex-col">
            {
                isMobile ? <NavbarTop /> : <NavbarSide />
            }
            <div className={`content w-full ${isMobile ? 'pl-2' : 'max-lg:pl-[80px] pl-[250px]'}`}>
                <div className="w-full h-full container p-6 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
