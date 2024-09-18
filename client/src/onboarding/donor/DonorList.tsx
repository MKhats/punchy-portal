/* eslint-disable react/no-deprecated */
import React from 'react';
import { Button, DataTable, ModalOverlay, Page, PageHero } from 'components/core';
import { ActionIcon } from 'components/core/ActionColumnIconsAndButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import onboardingAPI from 'APICalls/onboardingAPI';
import { filterRow } from 'utils/utils';
import HelpPanel from 'components/onboarding/HelpPanel';

const header = `{
Header: 'Donor Name',
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
		async function getDonors() {
			const donors = await onboardingAPI.donor.getDonorList()
			if (donors !== null) {
				setDonorList(donors);
			} else {
				toast.error('Unable to retrieve donor list');
			}
			setLoading(false);
		}
		getDonors();
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
isOpen={donor !== null}
...
`;
const handleDelete = `
const handleDelete = React.useCallback(async () => {
		if (donor) {
			const response = await onboardingAPI.donor.deleteDonor(donor.id!)
			if (response !== null) {
				toast.success('Donor Deleted');
				setDonorList(currentDonors => currentDonors.filter(x => x.id != donor.id))	// update the list to exclude the deleted one
			} else {
				donor.deleted = false;
				toast.error('Unable to delete Donor');
			}
			setDonor(null);
		}
	}, [donor])`;
const helpbuttons: helpDialog[] = [
	{
		title: 'Delete Donor',
		message: <div>The <span className="elementExample">ActionIcon</span> button updates the Donor state for the selected row.<br />
			<pre><code>{deletebutton}</code></pre>
			Once the state contains a Donor record, the modal becomes visible.<br />
			<pre><code>{modal}</code></pre>
			When the user clicks the <span className="elementExample">Delete</span> button on the modal,
			<span className="codeExample"> handleDelete()</span> runs which calls the <span className="codeExample">deleteDonor()</span> api.
			<pre><code>{handleDelete}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/donor/DonorList.tsx&version=GBmain&line=21&lineEnd=21&lineStartColumn=2&lineEndColumn=54&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/DonorService.cs&version=GBfeature/biddersearch&line=91&lineEnd=91&lineStartColumn=3&lineEndColumn=65&lineStyle=plain&_a=contents',
	},
	{
		title: 'Data Table',
		message: <div>The columns are defined with a header (name of the column) and accessor (data field).<br />
			<pre><code>{header}</code></pre>
			The column can also include a Cell to control how the data is formatted.<br />
			<pre><code>{cell}</code></pre>
			There is built in filter functionality, but if you want to control how the filter works you can use the Filter parameter<br />
			<pre><code>{filter}</code></pre>
			The React.UseEffect calls the GetDonorList() api and the list of donors is assigned to the data parameter of the DataTable<br />
			<pre><code>{api}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/donor/DonorList.tsx&version=GBmain&line=49&lineEnd=49&lineStartColumn=2&lineEndColumn=19&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/DonorService.cs&version=GBfeature/biddersearch&line=30&lineEnd=30&lineStartColumn=3&lineEndColumn=63&lineStyle=plain&_a=contents'
	}
];
const DonorList: React.FC = () => {
	const navigate = useNavigate();
	const [donorList, setDonorList] = React.useState<DonorDTO[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [donor, setDonor] = React.useState<DonorDTO | null>(null);	// chanage to just donorid - if null then modal is closed.

	const handleCancel = React.useCallback(() => {
		setDonor(null);
	}, []);

	const handleDelete = React.useCallback(async () => {
		if (donor) {
			const response = await onboardingAPI.donor.deleteDonor(donor.id!);
			if (response !== null) {
				toast.success('Donor Deleted');
				setDonorList(currentDonor => currentDonor.filter(x => x.id != donor.id));	// update the list to exclude the deleted one
			} else {
				donor.deleted = false;
				toast.error('Unable to delete Donor');
			}
			setDonor(null);
		}
	}, [donor]);

	React.useEffect(() => {
		async function getDonors() {
			const donors = await onboardingAPI.donor.getDonorList();
			if (donors !== null) {
				setDonorList(donors);
			} else {
				toast.error('Unable to retrieve donor list');
			}
			setLoading(false);
		}
		getDonors();
	}, []);

	// This is defined here so that the columns array isn't recreated every time the render function is called.
	const columns = [
		{
			Header: 'Donor ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Donor Name',
			accessor: 'fullName'
		},
		{
			Header: 'Contact Name',
			accessor: 'contactName'
		},
		{
			Header: 'Email',
			accessor: 'email'
		},
		{
			Header: 'Phone',
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
			filterMethod: (filter: filterRow, rowData: DonorDTO) => {
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
				const openDeleteModal = () => setDonor(rowInfo.original!);
				const openDonor = () => navigate(`/donor/${rowInfo.original.id}`);
				return (
					<React.Fragment>
						<ActionIcon title="Details" type="open" onClick={openDonor} />
						< ActionIcon title="Delete Donor" type="delete" onClick={openDeleteModal} />
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
		<Page title="Donor List">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Donor List"
			/>
			<section className="container-fluid">
				<Button className="btn-info" to={'/donor/0'}>
					<span style={{ textTransform: 'capitalize' }}>Add New Donor</span>
				</Button>
				<DataTable
					data={donorList}
					columns={columns}
					filterable={true}
					sortable={true}
					resizable={true}
					noDataText="No donors found."
				/>
			</section>
			<ModalOverlay
				isOpen={donor !== null}
				modalSize="md"
				onRequestClose={handleCancel}
				headerChildren="Delete Donor?"
				confirmButtonChildren="Delete"
				cancelButtonChildren="Cancel"
				cancelButtonAction={handleCancel}
				confirmButtonAction={handleDelete}
			>
				This cannot be undone
			</ModalOverlay>
		</Page>
	);

};

export default DonorList;