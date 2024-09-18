import React, { useState } from 'react';
import { Page, DataTable, PageHero, ActionIcon, ClearFilterButton, Button } from 'components/core';
import coreAPI from 'api/coreAPI';
import useEffectAsync from 'components/customHooks/useEffectAsync';
import { useNavigate } from 'react-router-dom';

const RoleListingPage = () => {
	const [filtered, setFiltered] = useState<string[]>([]);
	const [roles, setRoles] = useState<RoleDTO[]>([]);
	const navigate = useNavigate();

	useEffectAsync(async (isMounted: any) => {
		const roleData = await coreAPI.getRoles();
		if (isMounted()) {
			setRoles(roleData);
		}
	});

	const columns = [
		{
			Header: 'Name',
			accessor: 'name',
			filterable: true,
		},
		{
			Header: 'Description',
			accessor: 'description',
			filterable: true,
		},
		{
			accessor: 'Actions',
			Cell: (row: any) => (
				<ActionIcon title="Details" type="open" onClick={() => navigate(`/admin/roles/${row.original.id}`)} />
			),
			Filter: <ClearFilterButton onClick={() => setFiltered([])} />,
			Header: 'Actions',
			id: 'Actions',
		}
	];

	return (
		<Page>
			<PageHero title="Roles">
				<Button
					className="btn-primary"
					to="/admin/roles/-1"
				>
					New Role
				</Button>
			</PageHero>
			<div className="container-fluid">
				<DataTable
					data={roles}
					columns={columns}
					filtered={filtered}
					filterable={true}
					noDataText="No roles found"
					onFilteredChange={(newFiltered: any) => setFiltered(newFiltered)}
				/>
			</div>
		</Page>
	);
};

export default RoleListingPage;