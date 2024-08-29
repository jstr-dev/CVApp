import React from 'react';

interface TableHeadProps extends React.AllHTMLAttributes<HTMLDivElement> {
    tableHeaders: TableHeader<any>[];
}

function TableHead({ tableHeaders }: TableHeadProps) {
    return (
        <div className="flex flex-col w-full bg-neutral-100 p-2 rounded-lg table-content-padding">
            <div className="flex flex-row justify-between">
                {tableHeaders.map((header, index) => (
                    <div key={index} style={{ flex: header.flex ?? 1 }} className="text-xs font-semibold">{header.header}</div>
                ))}
            </div>
        </div>
    )
}

export default TableHead;
