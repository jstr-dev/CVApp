import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container px-0 max-w-5xl mx-auto w-full h-full">
            {children}
        </div>
    );
}