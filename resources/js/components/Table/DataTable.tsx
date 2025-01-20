import React, { useEffect } from 'react';
import Table from '@/components/Table/Table';
import TableHead from '@/components/Table/TableHead';
import TableFooter from '@/components/Table/TableFooter';
import TableContent from '@/components/Table/TableContent';
import TableRow from '@/components/Table/TableRow';
import Button from '../Button';
import axiosInstance from '@/services/AxiosInstance';
import SkeletonLine from '../SkeletonLine';
import Search from '../Search';
import Filters, { FilterList, CheckFilter } from '../Filters';

interface DataTableProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
    hasPagination?: boolean
    tableHeaders: TableHeader<T>[]
    uri: string
    params: URLSearchParams
    hasSearch?: boolean
    filters?: React.ReactNode
    header?: string
    headerElement?: React.ReactNode
    onEmptyComponent?: React.ReactNode
}

interface PaginationData
{
    currentPage: number
    resultsCount: number
    pageLimit: number
}

function DataTable<T>({ hasPagination, tableHeaders, uri, params, hasSearch, filters, ...props }: DataTableProps<T>) {
    const [tableData, setTableData] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [paginationData, setPaginationData] = React.useState({} as PaginationData);

    useEffect(() => {
        const url = uri + '?' + params.toString();

        axiosInstance.get(url).then((response) => {
            let data = response.data.data;

            if (data.pagination) {
                let paginationInfo = {
                    currentPage: data.page,
                    resultsCount: data.count,
                    pageLimit: data.pageLimit,
                } as PaginationData;

                setPaginationData(paginationInfo);
                data = data.results;
            } 

            setTableData(data);
            setLoading(false);
            
        })
    }, [uri, params])

    return (
        <Table>
            <div className="mb-6 flex flex-row w-full justify-between items-center max-md:flex-col gap-4 max-md:items-start">
                {props.header &&
                    <div className="flex flex-row gap-2">
                        <div className="text-md font-semibold">{props.header}</div>
                    </div>
                }

                <div className="flex flex-row flex-grow justify-end gap-2 max-md:w-full">
                    <TableControls hasSearch={hasSearch} filters={filters} />
                    {props.headerElement}
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <TableHead tableHeaders={tableHeaders} />

                {loading ? <ContentSkeleton tableHeaders={tableHeaders} count={5} /> :
                    <TableContent>
                        {tableData.map((data, index) => (
                            <TableRow key={index} model={data} tableHeaders={tableHeaders} />
                        ))}

                        {tableData.length === 0 && <div className="mt-6">{props.onEmptyComponent}</div>}
                    </TableContent>
                }
            </div>

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
                <div className="text-sm justify-center">Showing <b>1</b> out of <b>1</b> entries</div>
            }
        </div>
    )
}

function ContentSkeleton({ tableHeaders, count }: { tableHeaders: TableHeader<any>[], count: number }) {
    return (
        <TableContent>
            {Array(count).fill(0).map((_, index) => (
                <div className="flex flex-row w-full table-content-padding table-item" key={index}>
                    {tableHeaders.map((header, index) => {
                        return (
                            <div key={index} style={{ flex: header.flex ?? 1 }}>
                                <SkeletonLine style={{ width: '80%' }} />
                            </div>
                        );
                    })}
                </div>
            ))}
        </TableContent>
    )
}

function TableSearch() {
    return (
        <div className="w-full md:max-w-[20rem]">
            <Search />
        </div>
    )
}

function TableControls({ hasSearch, filters }: { hasSearch?: boolean, filters?: React.ReactNode }) {
    return (
        <>
            {hasSearch && <TableSearch />}
            {filters}
        </>
    )
}

export default DataTable;
