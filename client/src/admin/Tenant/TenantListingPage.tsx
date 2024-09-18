import React, { useState, useEffect } from 'react';
import { Button, setStatusCellValue, filterByStatus, StatusFilterMethod, ClearFilterButton, ActionIcon } from 'components/core';
import { DataTable, PageHero, Page } from 'components/core';
import tenantAPI from 'api/tenantAPI';
import { useNavigate } from 'react-router-dom';

const TenantListPage = () => {
	const navigate = useNavigate();
	const [tenants, setTenants] = React.useState<Tenant[]>([]);
	useEffect(() => {
		tenantAPI.getTenants()
			.then((tenants: Tenant[]) => setTenants(tenants));
	}, []);
	const [filtered, setFiltered] = useState([]);

	const tenantColumns = [
		{
			Header: 'Id ',
			accessor: 'id',
			filterable: true
		},
		{
			Header: 'Tenant',
			accessor: 'name',
			filterable: true
		},
		{
			Header: 'Status',
			accessor: 'isActive',
			Cell: setStatusCellValue,
			filterMethod: filterByStatus('status'),
			Filter: StatusFilterMethod
		},
		{
			Header: 'Actions',
			accessor: 'id',
			Filter: <ClearFilterButton onClick={() => setFiltered([])} />,
			Cell: (row: any) => (
				<React.Fragment>
					<ActionIcon title="Manage Users" type="manage-users" onClick={() => navigate(`/admin/tenants/${row.value}/users`)} />
					<ActionIcon title="Edit tenant details" type="edit" onClick={() => navigate(`/admin/tenants/${row.value}`)} />
				</React.Fragment>
			)
		}
	];
	return (
		<Page>
			<PageHero title="Tenants">
				<Button className="btn-primary" to="/admin/tenants/0">
					Add Tenant
				</Button>
			</PageHero>
			<div className="container-fluid">
				<DataTable
					data={tenants}
					filtered={filtered}
					columns={tenantColumns}
					filterable={true}
					noDataText="No tenants found"
					onFilteredChange={(newFiltered: any) => setFiltered(newFiltered)}
				/>
			</div>
		</Page>
	);
};

export default TenantListPage;