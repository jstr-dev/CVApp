import React from 'react';

interface TableRowProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
    tableHeaders: Array<TableHeader<T>>;
    model: T;
}

// TableRow component
function TableRow<T>({ model, tableHeaders }: TableRowProps<T>) {
    return (
        <div className="flex flex-row w-full">
            {tableHeaders.map((header, index) => (
                <div key={index} style={{ flex: header.flex ?? 1 }} className="text-sm text-gray-800">
                    {typeof header.model === 'function'
                        ? header.model(model)
                        : String(model[header.model])}
                </div>
            ))}
        </div>
    );
}

export default TableRow;
