import onboardingAPI from 'APICalls/onboardingAPI';
import { Button, Checkbox, DataTable, ModalOverlay, Page, PageHero } from 'components/core';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';

const TablesBidderList: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [table, setTable] = React.useState<TablesDTO>();
	const [biddersList, setBiddersList] = React.useState<Array<BidderDTO>>([]);
	const [selectedBidder, setSelectedBidder] = React.useState<BidderDTO | null>(null);
	const [pageSize, setPageSize] = React.useState<number>(5);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const paramsTableId = parseInt(params.tableId!);

	useEffect(() => {
		const getTable = async (id: number) => {
			const table = await tannerOnboardingAPI.tables.getTable(id);
			if (table) {
				setTable(table);
			} else {
				toast.error('Unable to retrieve table information');
			}
		};
		getTable(paramsTableId);
	}, [paramsTableId]);

	useEffect(() => {
		const getBidders = async () => {
			setIsLoading(true);
			const bidders = await onboardingAPI.bidder.getBidderList();
			setIsLoading(false);
			if (bidders) {
				setBiddersList(bidders);
			} else {
				toast.error('Unable to Retrieve Bidder List');
			}
		};
		getBidders();
	}, []);

	const updateBidder = async (bidder: BidderDTO, tableId: number, addTable?: boolean) => {
		const response = await onboardingAPI.bidder.postBidder({ ...bidder, tableId: tableId });
		if (response) {
			const text = addTable ? 'added to' : 'removed from';
			toast.success(`Bidder ${response.fullName} has been ${text} ${table?.tableName}`);
			const newBidderList = biddersList.map((bidder) => {
				if (bidder.id === response.id) {
					bidder.tableId = response.tableId;
				}
				return bidder;
			});
			setBiddersList(newBidderList);
		} else {
			toast.error(`Unable to add ${bidder.fullName} to ${table?.tableName}`);
		}

		setSelectedBidder(null);
	};

	const handleCancel =() => setSelectedBidder(null);

	const handleActionClick = (originalBidder: BidderDTO, currTableId: number, addTable: boolean) => {
		if (addTable) {
			const numBidders = biddersList
				.filter((bidder) => bidder.tableId === table?.id)
				.length;
			const isCapacityReached = numBidders >= table?.capacity!;

			if (isCapacityReached) {
				toast.error('Table capacity reached');
				return;
			}

			if (currTableId !== 0 && currTableId !== table?.id) {
				setSelectedBidder(originalBidder);
				return;
			}
			updateBidder(originalBidder, table?.id!, addTable);
		} else {
			updateBidder(originalBidder, 0);
		}
	};

	const columns = [
		{
			Header: 'Bidder ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Bidder Name',
			accessor: 'fullName'
		},
		{
			Header: 'Table Number',
			accessor: 'tableId',
			Cell: (rowInfo: any) => (rowInfo.row.tableId === 0 ? '' : rowInfo.row.tableId),
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const label = rowInfo.row.tableId === table?.id ? 'Remove' : 'Add';
				const addTable = label === 'Add';
				return (
					<React.Fragment>
						<Checkbox
							id={rowInfo.original.id.toString()}
							checked={!addTable}
							onChange={() => {}}
							name={rowInfo.original.id.toString()}
							isSwitch={true}
							onClick={() => handleActionClick(rowInfo.original, rowInfo.row.tableId, addTable)}
						/>
					</React.Fragment>
				);
			},
			Filter: <React.Fragment></React.Fragment>,
			Header: 'Update Bidder',
			id: 'Actions'
		}
	];

	return (
		<Page title="Table Bidders List">
			<PageHero
				className="d-flex"
				title={`Table ${paramsTableId} Bidders List`}
			/>
			<section className="container-fluid">
				<Button
					className="btn-info m-2"
					onClick={() => {
						navigate('/tables/tablelist');
					}}
				>
					Back to Tables List
				</Button>
				<DataTable
					data={biddersList}
					columns={columns}
					pageSize={pageSize}
					loading={isLoading}
				/>
			</section>
			<ModalOverlay
				isOpen={selectedBidder !== null}
				modalSize="md"
				onRequestClose={handleCancel}
				headerChildren="Remove Bidder from Table?"
				confirmButtonChildren="Confirm"
				cancelButtonChildren="Cancel"
				cancelButtonAction={handleCancel}
				confirmButtonAction={() => updateBidder(selectedBidder!, table?.id!)}
			>
				You are trying to remove a bidder assigned to Table {selectedBidder?.tableId}.
				 This cannot be undone.
			</ModalOverlay>
		</Page>
	);
};

export default TablesBidderList;
