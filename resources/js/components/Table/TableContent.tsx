import React from 'react';

interface TableContentProps extends React.AllHTMLAttributes<HTMLDivElement> {
}

function TableContent({ children }: TableContentProps) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export default TableContent
