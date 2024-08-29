import React from 'react';

interface TableProps extends React.AllHTMLAttributes<HTMLDivElement> {

}

function Table({ children }: TableProps) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export default Table;
