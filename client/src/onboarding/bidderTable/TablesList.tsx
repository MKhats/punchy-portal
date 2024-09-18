import onboardingAPI from 'APICalls/onboardingAPI';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';
import { ActionIcon, Button, DataTable, ModalOverlay, Page, PageHero } from 'components/core';
import React, { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TablesList = () => {
	const navigate = useNavigate();
	const [tableList, setTableList] = React.useState<Array<TablesDTO>>([]);
	const [table, setTable] = React.useState<TablesDTO | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [biddersList, setBiddersList] = React.useState<Array<BidderDTO>>([]);

	const handleCancel = React.useCallback(() => {
		setTable(null);
	}, []);

	const handleDelete = async () => {
		if (table) {
			setIsLoading(true);
			const response = await tannerOnboardingAPI.tables.deleteTable(table.id);
			if (response) {
				toast.success('Successfully Deleted Table');
				setTableList(currentTable => currentTable.filter(f => f.id != table.id));
			} else {
				table.isDeleted = false;
				toast.error('Unable to Delete Table');
			}
			setTable(null);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const getTables = async () => {
			const tables = await tannerOnboardingAPI.tables.getTables();
			if (tables) {
				setTableList(tables);
			} else {
				toast.error('Cannot Fetch Tables List');
			}
			setIsLoading(false);
		};

		const getBidders = async () => {
			const bidders = await onboardingAPI.bidder.getBidderList();
			if (bidders) {
				setBiddersList(bidders);
			} else {
				toast.error('Cannot Fetch Bidders List');
			}
		};
		getTables();
		getBidders();
	}, []);

	const columns = [
		{
			Header: 'Table ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Table Name',
			accessor: 'tableName'
		},
		{
			Header: 'Server Name',
			accessor: 'serverName'
		},
		{
			Header: 'Alcohol Allowed',
			accessor: 'allowAlcohol',
			Cell: (rowInfo: any) => {
				return rowInfo.row.allowAlcohol ? 'Yes' : 'No';
			}
		},
		{
			Header: 'Capacity',
			accessor: 'capacity',
			show: false
		},
		{
			Header: '# of Bidders Assigned / Capacity',
			accessor: 'numberOfBidders',
			Cell: (rowInfo: any) => {
				const { numberOfBidders, capacity } = rowInfo?.row;
				return `${numberOfBidders} / ${capacity}`;
			}
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const openDeleteModal = () => setTable(rowInfo.original!);
				const openTable = () => navigate(`/tables/${rowInfo.original.id}`);
				return (
					<React.Fragment>
						<ActionIcon title="Details" type="open" onClick={openTable} />
						< ActionIcon title="Delete Table" type="delete" onClick={openDeleteModal} />
					</React.Fragment>
				);
			},
			Filter: <React.Fragment></React.Fragment>,
			Header: 'Actions',
			id: 'Actions'
		}
	];

	const csvData: Array<any> = [
		[
			'Table ID',
			'Table Name',
			'Server Name',
			'Alcohol Allowed',
			'Capacity',
			'No of Bidders Assigned',
			'Bidders Assigned'
		],
		...tableList.map(table => [
			table.id,
			table.tableName,
			table.serverName,
			table.allowAlcohol ? 'Yes' : 'No',
			table.capacity,
			table.numberOfBidders,
			biddersList
				.filter(bidder => bidder.tableId === table.id)
				.map(bidder => {
					return `${bidder.fullName} (${bidder.id})`;
				})
				.join(', '),
		])
	];


	const navigateToCustomOnboardingPage = () => navigate("/tannerOnboarding");

	if (isLoading) {
		return null;
	}

	return (
		<Page title="Tables List">
			<PageHero
				className="d-flex"
				title="Tables List "
			/>
			<section className="container-fluid">
				<div className="row mb-3">
					<div className="d-flex flex-row justify-content-between">
						<Button className="btn-info" to={'/tables/0'}>
							<span className="text-capitalize">Add New Table</span>
						</Button>
						<Button
							className="btn-secondary"
							onClick={navigateToCustomOnboardingPage}
						>
							View Onboarding Page
						</Button>
						<Button className="btn-primary">
							<CSVLink
								style={{color: 'white', textDecoration: 'none'}}
								data={csvData} filename="tableList.csv">
								Export to CSV
							</CSVLink>
						</Button>

					</div>
				</div>
				<DataTable
					data={tableList}
					columns={columns}
					filterable={true}
					sortable={true}
					resizable={true}
					noDataText="No Tables Found."
				/>
			</section>
			<ModalOverlay
				isOpen={table !== null}
				modalSize="md"
				onRequestClose={handleCancel}
				headerChildren="Delete Table?"
				confirmButtonChildren="Delete"
				cancelButtonChildren="Cancel"
				cancelButtonAction={handleCancel}
				confirmButtonAction={handleDelete}
			>
				{table && table.numberOfBidders > 0
					? 'Cannot Delete a Table with Bidders Assigned to it'
					: ''}
				This cannot be undone.
			</ModalOverlay>
		</Page>
	);
};

export default TablesList;