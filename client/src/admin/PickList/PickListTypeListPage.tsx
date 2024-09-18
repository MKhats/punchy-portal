import React from 'react';
import { Page, PageHero, DataTable, Spinner, ActionIcon } from 'components/core';
import { Button, setStatusCellValue, filterByStatus, StatusFilterMethod } from 'components/core';
import pickListAPI from 'api/pickListAPI';
import AuthorizationWrapper from 'auth/AuthorizationWrapper';
import { Permissions } from 'auth/Permissions';
import { useNavigate } from 'react-router-dom';

const PickListTypeListPage = () => {
	const [pickListTypes, setPickListTypes] = React.useState<PickListType[]>([]);
	const [isLoading, setIsLoading] = React.useState<Boolean>(false);
	const navigate = useNavigate();
	React.useEffect(() => {
		const fetchPickListTypes = async () => {
			setIsLoading(true);
			const res = await pickListAPI.getPickListTypes();
			setIsLoading(false);
			setPickListTypes(res);
		};

		fetchPickListTypes();
	}, []);

	const [filtered, setFiltered] = React.useState<any[]>([]);
	const columns = [
		{
			Header: 'Code',
			accessor: 'code',
		},
		{
			Header: 'Description',
			accessor: 'description'
		},
		{
			Header: 'Status',
			accessor: 'isActive',
			Cell: setStatusCellValue,
			filterMethod: filterByStatus('isActive'),
			Filter: StatusFilterMethod
		},
		{
			Header: 'Actions',
			accesor: 'id',
			filterable: false,
			Cell: (rowValue: any) => ( // turn into a component
				<React.Fragment>
					<ActionIcon title="Edit picklist type" type="edit" onClick={() => navigate(`/pick-lists/${rowValue.original.id}`)} />
					<ActionIcon title="Open picklist items" type="open" onClick={() => navigate(`/pick-lists/${rowValue.original.id}/pick-list-items`)} />
				</React.Fragment>
			)
		}
	];

	return (
		<Page title="Pick list types">
			<PageHero title="Picklist Items">
				<AuthorizationWrapper type="hide" permissions={[Permissions.WritePickList]}>
					<Button className="btn-primary " to="/pick-lists/0">
						Add pickList type
					</Button>
				</AuthorizationWrapper>
			</PageHero>
			<div className="container-fluid">
				{isLoading ? <Spinner /> :
					<DataTable
						data={pickListTypes}
						columns={columns}
						filterable={true}
						filtered={filtered}
						onFilteredChange={(f: any[]) => setFiltered(f)}
					/>}

			</div>
		</Page>
	);
};

export default PickListTypeListPage;