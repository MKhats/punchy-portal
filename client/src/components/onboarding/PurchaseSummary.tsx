import React from 'react';
import { Utils } from 'utils';
import { DataTable } from 'components/core';


const PurchaseSummary = (props: { purchases: PurchaseDTO[] }) => {
	const columns = [
		{
			Header: 'Purchase ID',
			accessor: 'id',
			show: false,
		},
		{
			Header: 'Bidder',
			accessor: 'fullName',
		},
		{
			Header: 'Item',
			accessor: 'itemName'
		},
		{
			Header: 'Price',
			accessor: 'price',
			Cell: (row: any) => (
				<div>{Utils.formatCurrency(row.original.price)}</div>
			),
		},
	];

	return (
		<DataTable
			data={props.purchases}
			className="dashboardTable"
			columns={columns}
			filterable={false}
			resizable={false}
			showPagination={false}
			noDataText="No purchases found."
		/>
	);
};

export default PurchaseSummary;