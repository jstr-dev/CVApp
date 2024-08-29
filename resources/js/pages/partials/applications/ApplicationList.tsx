import React from 'react';
import DataTable from '@/components/Table/DataTable';
import Panel from '@/components/Panel';

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

function ApplicationList({ status, label, ...props }: ApplicationListProps) {
    const statusName = status ? status.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') : 'All';
    const uri = "applications/get";
    const params = new URLSearchParams();

    if (status) {
        params.append('status', status.join(','));
    }

    return (
        <Panel {...props}>
            <div className="text-md font-semibold mb-4">{label ?? statusName + " Applications"}</div>

            <DataTable<Application> className={''} hasPagination tableHeaders={tableHeaders} uri={uri} params={params}>

            </DataTable>
        </Panel>
    );
}

export default ApplicationList;
