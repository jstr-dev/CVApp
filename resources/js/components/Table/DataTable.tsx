import React, { useEffect } from 'react';
import Table from '@/components/Table/Table';
import TableHead from '@/components/Table/TableHead';
import TableFooter from '@/components/Table/TableFooter';
import TableContent from '@/components/Table/TableContent';
import TableRow from '@/components/Table/TableRow';
import Button from '../Button';
import axiosInstance from '@/services/AxiosInstance';
import SkeletonLine from '../SkeletonLine';

interface DataTableProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
    hasPagination?: boolean
    tableHeaders: Array<TableHeader<T>>
    uri: string
    params: URLSearchParams
}

function DataTable<T>({ hasPagination, tableHeaders, uri, params, ...props }: DataTableProps<T>) {
    const [tableData, setTableData] = React.useState<Array<T>>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const url = uri + '?' + params.toString();

        axiosInstance.get(url).then((response) => {
            setTableData(response.data);
            setLoading(false);
        })
    }, [uri, params])

    return (
        <Table>
            <TableHead tableHeaders={tableHeaders} />

            {loading ? <ContentSkeleton tableHeaders={tableHeaders} count={5} /> :
                <TableContent>
                    {tableData.map((data, index) => (
                        <TableRow key={index} model={data} tableHeaders={tableHeaders} />
                    ))}
                </TableContent>
            }

            <TableFooter>
                {hasPagination && <Pagination loading={loading} />}
            </TableFooter>
        </Table>
    );
}

function Pagination({ loading }: { loading?: boolean }) {
    return (
        <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex flex-row gap-2">
                <Button buttonStyle="secondary" size="small">Previous</Button>
                <Button buttonStyle="secondary" size="small">Next</Button>
            </div>

            {loading ? <SkeletonLine style={{ width: '12rem' }} /> :
                <div className="text-sm justify-center text-gray-800">Showing <b>1</b> out of <b>1</b> entries</div>
            }
        </div>
    )
}

function ContentSkeleton({ tableHeaders, count }: { tableHeaders: TableHeader<any>[], count: number }) {
    return (
        <TableContent>
            {Array(count).fill(0).map((_, index) => (
                <div className="flex flex-row w-full" key={index}>
                    {tableHeaders.map((header, index) => {
                        return (
                            <div key={index} style={{ flex: header.flex ?? 1 }} className="text-sm text-gray-800">
                                <SkeletonLine style={{ width: '80%' }} />
                            </div>
                        );
                    })}
                </div>
            ))}
        </TableContent>
    )
}

export default DataTable;
