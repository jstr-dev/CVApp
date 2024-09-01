import React from 'react';
import DataTable from '@/components/Table/DataTable';
import Panel from '@/components/Panel';
import Button from '@/components/Button';

interface ApplicationListProps extends React.AllHTMLAttributes<HTMLDivElement> {
    status?: Array<ApplicationStatus>
    label?: string
}

const tableHeaders: TableHeader<Application>[] = [
    { header: 'Job Title', model: (app: Application) => <div>{app.job.title}</div>, flex: 4 },
    { header: 'Company', model: (app: Application) => app.job.company, flex: 2 },
    { header: 'Salary', model: (app: Application) => app.job.salary.toString(), flex: 2 },
    { header: 'Date', model: 'created_at', flex: 2 },
];

function AddApplication()
{
    return (
        <div className="w-auto gap-2 flex flex-row items-center">
            <Button className="w-full" size="regular" buttonStyle="default" icon="fa-plus" hideChildrenOnViewport='sm'>New</Button>
        </div>
    )
}

function ApplicationList({ status, label, ...props }: ApplicationListProps) {
    const uri = "applications/get";
    const params = new URLSearchParams();

    if (status) {
        params.append('status', status.join(','));
    }

    return (
        <Panel {...props}>
            <DataTable<Application>
                className={''}
                hasPagination
                tableHeaders={tableHeaders}
                uri={uri}
                params={params}
                hasSearch
                hasFilters
                header={label}
                headerElement={<AddApplication/>}
            />
        </Panel>
    );
}

export default ApplicationList;
