import React from 'react';

interface PanelGridProps
{
    children: React.ReactNode
}

export default function PanelGrid({ children }: PanelGridProps)
{
    return (
        <div className={`PanelGrid flex flex-col lg:flex-row gap-2`}>
            {children}
        </div>
    )
}