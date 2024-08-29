import React from 'react';

interface TableHeadProps extends React.AllHTMLAttributes<HTMLDivElement> {
    tableHeaders: TableHeader<any>[];
}

function TableHead({ tableHeaders }: TableHeadProps) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
                {tableHeaders.map((header, index) => (
                    <div key={index} style={{ flex: header.flex ?? 1 }} className="text-xs text-gray-800 font-semibold">{header.header}</div>
                ))}
            </div>
            <div className="rule"></div>
        </div>
    )
}

export default TableHead;
