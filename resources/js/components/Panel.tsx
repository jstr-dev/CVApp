import React from 'react';

export default function Panel({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={"ContentPanel rounded-md flex flex-col" + " " + className}>
            {children}
        </div>
    );
}