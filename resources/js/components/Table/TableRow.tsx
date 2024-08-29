import React from 'react';

interface TableRowProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
    tableHeaders: Array<TableHeader<T>>;
    model: T;
}

function TableRow<T>({ model, tableHeaders }: TableRowProps<T>) {
    return (
        <div className="flex flex-row w-full">
            {tableHeaders.map((header, index) => {
                let cellContent: React.ReactNode;

                try {
                    if (typeof header.model === 'function') {
                        cellContent = header.model(model);
                    } else {
                        cellContent = String(model[header.model]);
                    }
                } catch (error) {
                    cellContent = "-";
                }

                return (
                    <div key={index} style={{ flex: header.flex ?? 1 }} className="text-sm">
                        {cellContent}
                    </div>
                );
            })}
        </div>
    );
}

export default TableRow;
