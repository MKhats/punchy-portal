import React from 'react';
import { Utils } from 'utils';
import { DataTable } from 'components/core';


const MerchandiseSummary = (props: { merchandise: MerchandiseDTO[] | undefined }) => {
	const columns = [
		{
			Header: 'Merchandise ID',
			accessor: 'id',
			show: false,
		},
		{
			Header: 'Item',
			accessor: 'itemName',
		},
		{
			Header: 'Donor',
			accessor: 'fullName'
		},
		{
			Header: 'Value',
			accessor: 'retailValue',
			Cell: (row: any) => (
				<div>{Utils.formatCurrency(row.original.price)}</div>
			),
		},
	];

	return (
		<DataTable
			data={props.merchandise}
			className="dashboardTable"
			columns={columns}
			filterable={false}
			resizable={false}
			showPagination={false}
			noDataText="No purchases found."
		/>
	);
};

export default MerchandiseSummary;