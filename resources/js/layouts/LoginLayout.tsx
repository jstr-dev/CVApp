import React from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen justify-center items-center container mx-auto w-full h-full">
            {children}
        </div>
    );
}