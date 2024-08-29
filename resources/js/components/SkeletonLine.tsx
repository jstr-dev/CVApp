import React from 'react';

function SkeletonLine({ className, ...props }: React.AllHTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={"w-full h-5 skeleton-line rounded-md " + className}></div>
    )
}

export default SkeletonLine;
