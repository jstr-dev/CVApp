import React from 'react';

interface TableFooterProps extends React.AllHTMLAttributes<HTMLDivElement> {

}

function TableFooter({children}: TableFooterProps) {
    return (
        <div className="w-full flex flex-col">
            <div className="rule"></div>
            {children}
        </div>
    )
}

export default TableFooter;
