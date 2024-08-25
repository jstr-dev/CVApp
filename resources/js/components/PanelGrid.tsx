import React from 'react';

interface PanelGridProps extends React.AllHTMLAttributes<HTMLDivElement>
{
    children: React.ReactNode
}

export default function PanelGrid({ children, className }: PanelGridProps)
{
    return (
        <div className={`PanelGrid flex flex-col lg:flex-row gap-2 ${className ?? ''}`}>
            {children}
        </div>
    )
}