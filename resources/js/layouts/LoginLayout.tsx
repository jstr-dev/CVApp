import React from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-full">
            <div className="xl:w-2/5 w-1/2 max-lg:w-full h-full content-col flex flex-col justify-center items-center">
                {children}
            </div>

            <div className="xl:w-3/5 w-1/2 bg-black max-lg:hidden">

            </div>
        </div>
    );
}
