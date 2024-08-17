import React from 'react';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full h-full">
            <div className="h-full flex flex-col justify-center items-center max-lg:hidden w-2/5">
                Steps go here?
            </div>

            <div className="content-col flex flex-col justify-center items-center w-3/5 max-lg:w-full">
                {children}
            </div>
        </div>
    );
}
