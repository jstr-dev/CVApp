import React from 'react';
import DataTable from '@/components/Table/DataTable';
import Panel from '@/components/Panel';
import Button from '@/components/Button';
import Badge, { BadgeProps } from '@/components/Badge';

interface ApplicationListProps extends React.AllHTMLAttributes<HTMLDivElement> {
    status?: Array<ApplicationStatus>
    label?: string
}

const statusMap: { [key in ApplicationStatus]: BadgeProps['styleName'] } = {
    'acknowledged': 'success',
    'pending': 'neutral',
    'declined': 'danger',
    'success': 'success'
}

const tableHeaders: TableHeader<Application>[] = [
    { header: 'Job Title', model: (app: Application) => <div>{app.job.title}</div>, flex: 1.5 },
    { header: 'Company', model: (app: Application) => app.job.company, flex: 1 },
    { header: 'Salary', model: (app: Application) => app.job.salary.toString(), flex: 1 },
    { header: 'Status', model: (app: Application) => <Badge styleName={statusMap[app.status]}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</Badge>, flex: 1 },
    { header: 'Date', model: 'created_at', flex: 1 },
];

function AddApplication()
{
    return (
        <div className="w-auto gap-2 flex flex-row items-center">
            <Button className="w-full" size="regular" buttonStyle="primary" icon="fa-plus" textClass='max-sm:hidden'>New</Button>
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
