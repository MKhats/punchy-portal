import React, { useState, useContext, useEffect } from 'react';
import { PickListContext } from 'context/PickListContext';
import { Page, DataTable, PageHero, Button, LoadingPage } from 'components/core';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionIcon, ClearFilterButton, setStatusCellValue, filterByStatus, StatusFilterMethod } from 'components/core';
import pickListAPI from 'api/pickListAPI';

const PickListItemListPage = () => {
	const { pickListTypeId } = useParams();
	const navigate = useNavigate();
	const { pickListTypes } = useContext(PickListContext);
	const [data, setData] = useState<PickListItem[]>([]);
	const [filtered, setFiltered] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pickListType, setPickListType] = useState<PickListType>();

	useEffect(() => {
		const foundPickListType = pickListTypes.find((pType: PickListType) => pType.id === Number(pickListTypeId));
		if (foundPickListType !== undefined) {
			setPickListType(foundPickListType);
			fetchPickList(foundPickListType.code!);
		}

		async function fetchPickList(code: string) {
			setIsLoading(true);
			const res = await pickListAPI.getPickListItemByType(code);
			setData(res);
			setIsLoading(false);
		}
	}, [pickListTypeId, pickListTypes]);

	const clearFilters = () => {
		setFiltered([]);
	};

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
			Filter: StatusFilterMethod,
		},
		{
			Header: 'Actions',
			id: 'Actions',
			Cell: <ActionIcon title="Edit" type="edit" />,
			Filter: <ClearFilterButton onClick={clearFilters} />
		}
	];

	const getActionLink = (rowId: any): string => `/pick-lists/${pickListTypeId}/pick-list-items/${rowId}`;

	const onRowClick = ({ row }: any) => navigate(getActionLink(row._original.id));
	if (pickListType === undefined) {
		return <LoadingPage />;
	}
	return (
		<Page title={pickListType.description ?? pickListType.code ?? 'Add picklist item'}>
			<PageHero title={pickListType.description ?? pickListType.code ?? 'Add picklist item'} parentRoute="/pick-lists">
				<Button
					className="btn-primary align-self-start"
					to={`/pick-lists/${pickListTypeId}/pick-list-items/0`}
				>
					Add PickList Item
				</Button>
			</PageHero>
			<div className="container-fluid">
				<DataTable
					data={data}
					columns={columns}
					onRowClick={onRowClick}
					filterable={true}
					filtered={filtered}
					onFilteredChange={(f: any[]) => setFiltered(f)}
					loading={isLoading}
				/>
			</div>
		</Page>
	);
};

export default PickListItemListPage;
