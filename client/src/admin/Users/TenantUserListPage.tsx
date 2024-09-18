import React from 'react';
import { DataTable, Page, PageHero } from 'components/core';
import { Button, filterByStatus, StatusFilterMethod, setStatusCellValue, ClearFilterButton, ActionIcon } from 'components/core';
import coreAPI from 'api/coreAPI';
import { useNavigate, useParams } from 'react-router-dom';


const TenantUserListPage = () => {
	const { tenantId } = useParams();
	const navigate = useNavigate();
	const [tenantUsers, setTenantUsers] = React.useState<UserDetailsDTO[]>([]);
	const [roles, setRoles] = React.useState<RoleDTO[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [filtered, setFiltered] = React.useState<string[]>([]);


	React.useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			coreAPI.getTenantUsers({ tenantId: tenantId ? +tenantId : -1 })
				.then((tenantUsers: React.SetStateAction<UserDetailsDTO[]>) => {
					setTenantUsers(tenantUsers);
				})
				.then(() => coreAPI.getRoles())
				.then((roles: React.SetStateAction<RoleDTO[]>) => {
					setRoles(roles);
					setLoading(false);
				});
		};
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns = [
		{
			Header: 'Name',
			accessor: (row: any) => row.firstName + ' ' + row.lastName,
			id: 'Name',
			filterable: true,
		},
		{
			Header: 'Status',
			accessor: 'isActive',
			id: 'isActive',
			filterMethod: filterByStatus('isActive'),

			Filter: StatusFilterMethod,
			Cell: setStatusCellValue,
			defaultCanFilter: true
		},
		{
			Header: 'Email',
			accessor: 'email',
			filterable: true,
		},
		{
			Header: 'Role',
			accessor: 'roleIds',
			filterable: true,
			Cell: (row: any) => {
				if (row.value === undefined || row.value.length === 0) {
					return 'None';
				}
				return readRolesById(row.value);
			}
		},
		{
			accessor: 'Actions',
			Cell: <ActionIcon title="Details" type="open" />,
			Filter: <ClearFilterButton onClick={() => setFiltered([])} />,
			Header: 'Actions',
			id: 'Actions',
		}
	];

	function readRolesById(roleIds: number[]) {
		let roleText = '';
		roleIds.forEach(id => {
			const role = roles.find(r => r.id === id);
			if (role) {
				roleText += role.name + ',';
			}
		});
		if (roleText[roleText.length - 1] === ',') {
			roleText = roleText.slice(0, roleText.length - 1);
		}
		return roleText;
	}

	function getActionLink(tenantId: any, rowId: any) {
		return `/admin/tenants/${tenantId}/users/${rowId}`;
	}

	function onRowClick({ original }: { original?: any }) {
		navigate(getActionLink(tenantId, original.id));
	}

	return (
		<Page>
			<PageHero title="Manage users" parentRoute="/admin/tenants">
				<Button to={getActionLink(tenantId, -1)} className="btn-primary">New user</Button>
			</PageHero>
			<div className="container-fluid">
				<DataTable
					data={tenantUsers}
					columns={columns}
					showPagination={true}
					onFilteredChange={(filtered: any) => setFiltered(filtered)}
					filterable={true}
					filtered={filtered}
					onRowClick={onRowClick}
					loading={loading}
					defaultFiltered={[{ id: 'isActive', value: 'Active' }]}
				/>
			</div>
		</Page>
	);
};

export default TenantUserListPage;