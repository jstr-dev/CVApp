import React, { useEffect } from 'react';
import Table from '@/components/Table/Table';
import TableHead from '@/components/Table/TableHead';
import TableFooter from '@/components/Table/TableFooter';
import TableContent from '@/components/Table/TableContent';
import TableRow from '@/components/Table/TableRow';
import Button from '../Button';
import axiosInstance from '@/services/AxiosInstance';

interface DataTableProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
    hasPagination?: boolean
    tableHeaders: Array<TableHeader<T>>
    uri: string
    params: URLSearchParams
}

function DataTable<T>({ hasPagination, tableHeaders, uri, params }: DataTableProps<T>) {
    const [tableData, setTableData] = React.useState<Array<T>>([]);

    useEffect(() => {
        const url = uri + '?' + params.toString();

        axiosInstance.get(url).then((response) => {
            setTableData(response.data);
        })
    }, [uri, params])

    return (
        <Table>
            <TableHead tableHeaders={tableHeaders} />

            <TableContent>
                {tableData.map((data, index) => (
                    <TableRow key={index} model={data} tableHeaders={tableHeaders}/>
                ))}
            </TableContent>

            <TableFooter>
                {hasPagination && <Pagination />}
            </TableFooter>
        </Table>
    );
}

function Pagination() {
    return (
        <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row gap-2">
                <Button buttonStyle="secondary" size="small">Previous</Button>
                <Button buttonStyle="secondary" size="small">Next</Button>
            </div>

            <div className="text-sm justify-center text-gray-800">Showing <b>1</b> out of <b>1</b> entries</div>
        </div>
    )
}

export default DataTable;
