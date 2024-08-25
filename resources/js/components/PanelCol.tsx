import React from 'react';

export default function PanelCol({children} : React.AllHTMLAttributes<HTMLDivElement>)
{
    return (
        <div className="w-full flex flex-col gap-2">{children}</div>
    )
}