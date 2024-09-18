/* eslint-disable react/no-deprecated */
import React from 'react';

import { ActionIcon } from 'components/core/ActionColumnIconsAndButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import onboardingAPI from 'APICalls/onboardingAPI';
import { Button, DataTable, ModalOverlay, Page, PageHero } from 'components/core';
import { filterRow } from 'utils/utils';
import HelpPanel from 'components/onboarding/HelpPanel';

const header = `{
Header: 'Bidder Name',
accessor: 'fullName'
}, `;
const cell = `
Cell: (rowInfo: any) => (rowInfo.row.dateAddedYear == null ? '' : rowInfo.row.dateAddedYear!)`;
const filter = `Filter: ({ filter, onChange }: { filter: filterRow, onChange: Function }) => (
	<select
		onChange={event => onChange(event.target.value)}
		value={filter ? filter.value : 'all'}
	>
		<option value="all">Show All</option>
		<option value="thisyear">This Year</option>
		<option value="older">Older</option>
	</select>
}`;
const api = `
React.useEffect(() => {
		async function getBidders() {
			const donors = await onboardingAPI.bidder.getBidderList()
			if (donors !== null) {
				setBidderList(donors);
			} else {
				toast.error('Unable to retrieve bidder list');
			}
			setLoading(false);
		}
		getBidders();
	}, []);`;

const deletebutton = `
const openDeleteModal = () => setBidder(rowInfo.original!);
...
return (
	<React.Fragment>
...
		< ActionIcon title="Delete Bidder" type="delete" onClick={openDeleteModal} />
	</React.Fragment>
)`;
const modal = `
<ModalOverlay
isOpen={bidder !== null}
...
`;
const handleDelete = `
const handleDelete = React.useCallback(async () => {
		if (bidder) {
			const response = await onboardingAPI.bidder.deleteBidder(bidder.id!)
			if (response !== null) {
				toast.success('Bidder Deleted');
				setBidderList(currentBidders => currentBidders.filter(x => x.id != bidder.id))	// update the list to exclude the deleted one
			} else {
				bidder.deleted = false;
				toast.error('Unable to delete Bidder');
			}
			setBidder(null);
		}
	}, [bidder])`;
const helpbuttons: helpDialog[] = [
	{
		title: 'Delete Bidder',
		message: <div>The <span className="elementExample">ActionIcon</span> button updates the Bidder state for the selected row.<br />
			<pre><code>{deletebutton}</code></pre>
			Once the state contains a Bidder record, the modal becomes visible.<br />
			<pre><code>{modal}</code></pre>
			When the user clicks the <span className="elementExample">Delete</span> button on the modal,
			<span className="codeExample"> handleDelete()</span> runs which calls the <span className="codeExample">deleteBidder()</span> api.
			<pre><code>{handleDelete}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/bidder/BidderList.tsx&version=GBfeature/biddersearch&line=24&lineEnd=25&lineStartColumn=1&lineEndColumn=2&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/BidderService.cs&version=GBfeature/biddersearch&line=161&lineEnd=161&lineStartColumn=2&lineEndColumn=66&lineStyle=plain&_a=contents',
	},
	{
		title: 'Data Table',
		message: <div>The columns are defined with a header (name of the column) and accessor (data field).<br />
			<pre><code>{header}</code></pre>
			The column can also include a Cell to control how the data is formatted.<br />
			<pre><code>{cell}</code></pre>
			There is built in filter functionality, but if you want to control how the filter works you can use the Filter parameter<br />
			<pre><code>{filter}</code></pre>
			The React.UseEffect calls the GetBidderList() api and the list of bidders is assigned to the data parameter of the DataTable<br />
			<pre><code>{api}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/bidder/BidderList.tsx&version=GBfeature/biddersearch&line=52&lineEnd=52&lineStartColumn=2&lineEndColumn=19&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/BidderService.cs&version=GBfeature/biddersearch&line=38&lineEnd=38&lineStartColumn=3&lineEndColumn=65&lineStyle=plain&_a=contents'
	}
];


const BidderList: React.FC = () => {
	const navigate = useNavigate();
	const [bidderList, setBidderList] = React.useState<BidderDTO[]>([]);
	const [bidder, setBidder] = React.useState<BidderDTO | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const handleCancel = React.useCallback(() => {
		setBidder(null);
	}, []);

	const handleDelete = React.useCallback(async () => {
		if (bidder) {
			const response = await onboardingAPI.bidder.deleteBidder(bidder.id!);
			if (response !== null) {
				toast.success('Bidder Deleted');
				setBidderList(currentBidders => currentBidders.filter(x => x.id != bidder.id));	// update the list to exclude the deleted one
			} else {
				bidder.deleted = false;
				toast.error('Unable to delete Bidder');
			}
			setBidder(null);
		}
	}, [bidder]);

	React.useEffect(() => {
		async function getBidders() {
			const donors = await onboardingAPI.bidder.getBidderList();
			if (donors !== null) {
				setBidderList(donors);
			} else {
				toast.error('Unable to retrieve bidder list');
			}
			setLoading(false);
		}
		getBidders();
	}, []);
	// This is defined here so that the columns array isn't recreated every time the render function is called.
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
			accessor: 'tableNumber'
		},
		{
			Header: 'Email',
			accessor: 'email'
		},
		{
			Header: 'Home Phone',
			accessor: 'homePhone'
		},
		{
			accessor: 'dateAddedYear',
			// If you need to do this, make sure that the work being done is as lightweight as possible
			Cell: (rowInfo: any) => (rowInfo.row.dateAddedYear == null ? '' : rowInfo.row.dateAddedYear!),
			Filter: ({ filter, onChange }: { filter: filterRow, onChange: Function }) => (
				<select
					onChange={event => onChange(event.target.value)}
					value={filter ? filter.value : 'all'}
				>
					<option value="all">Show All</option>
					<option value="thisyear">This Year</option>
					<option value="older">Older</option>
				</select>
			),
			filterMethod: (filter: filterRow, rowData: BidderDTO) => {
				// rowData is the row or rows of data supplied to the table
				if (filter.value === 'all') {
					return true;
				}
				if (filter.value === 'thisyear') {
					return rowData.dateAddedYear != null && rowData.dateAddedYear === new Date().getFullYear() ? true : false;
				}
				if (filter.value === 'older') {
					return rowData.dateAddedYear != null && rowData.dateAddedYear < new Date().getFullYear() ? true : false;
				}
				return true;
			},
			Header: 'Last Donation',
			id: 'dateAddedYear'
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const openDeleteModal = () => setBidder(rowInfo.original!);
				const openBidder = () => navigate(`/bidder/${rowInfo.original.id}`);
				return (
					<React.Fragment>
						<ActionIcon title="Details" type="open" onClick={openBidder} />
						< ActionIcon title="Delete Bidder" type="delete" onClick={openDeleteModal} />
					</React.Fragment>
				);
			},
			Filter: <React.Fragment></React.Fragment>,
			Header: 'Actions',
			id: 'Actions'
		}

	];
	if (loading) {
		return null;
	}
	return (
		<Page title="Bidder List">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Bidder List"
			/>
			<section className="container-fluid">
				<Button className="btn-info" to={'/bidder/0'}>
					<span style={{ textTransform: 'capitalize' }}>Add New Bidder</span>
				</Button>
				<DataTable
					data={bidderList}
					columns={columns}
					filterable={true}
					sortable={true}
					resizable={true}
					noDataText="No bidders found."
				/>
			</section>
			<ModalOverlay
				isOpen={bidder !== null}
				modalSize="md"
				onRequestClose={handleCancel}
				headerChildren="Delete Bidder?"
				confirmButtonChildren="Delete"
				cancelButtonChildren="Cancel"
				cancelButtonAction={handleCancel}
				confirmButtonAction={() => handleDelete()}
			>
				This cannot be undone
			</ModalOverlay>

		</Page>
	);


};

export default BidderList;