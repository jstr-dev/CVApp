import React from 'react';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement>
{
    loading?: boolean
}

export default function Panel({ children, className }: PanelProps) {
    return (
        <div className={`ContentPanel rounded-md flex flex-col ${className ?? ''}`}>
            {children}
        </div>
    );
}