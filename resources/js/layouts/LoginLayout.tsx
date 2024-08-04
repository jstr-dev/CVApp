import React from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container px-0 max-w-7xl">
            {children}
        </div>
    );
}