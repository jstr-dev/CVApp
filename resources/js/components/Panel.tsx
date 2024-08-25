import React from 'react';
import Loader from './Loader';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement>
{
    loading?: boolean,
}

export default function Panel({ children, className, loading }: PanelProps) {
    return (
        <div className={`ContentPanel rounded-md flex flex-col ${className ?? ''}`}>
            {loading ? 
                <div className="w-full h-full flex justify-center items-center">
                    <Loader theme="light"/>
                </div> 
            : children}
        </div>
    );
}