import React from 'react';

interface TableContentProps extends React.AllHTMLAttributes<HTMLDivElement> {
}

function TableContent({ children }: TableContentProps) {
    return (
        <div>
            {children}
        </div>
    )
}

export default TableContent
