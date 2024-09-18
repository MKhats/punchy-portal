/* eslint-disable react/no-deprecated */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import onboardingAPI from 'APICalls/onboardingAPI';
import { Button, DataTable, ModalOverlay, Page, PageHero } from 'components/core';
import { ActionIcon } from 'components/core/ActionColumnIconsAndButton';
import { toast } from 'react-toastify';

import { Utils } from 'utils/';

import HelpPanel from 'components/onboarding/HelpPanel';

const header = `{
Header: 'Item',
accessor: 'itemName'
}, `;
const cell = `
Cell: (rowInfo: any) => (rowInfo.row.dateAddedYear == null ? '' : rowInfo.row.dateAddedYear!)`;

const api = `
React.useEffect(() => {
		async function getMerchandises() {
			const merchandises = await onboardingAPI.merchandise.getMerchandiseList()
			if (merchandises !== null) {
				setMerchandiseList(merchandises);
			} else {
				toast.error('Unable to retrieve merchandise list');
			}
			setLoading(false);
		}
		getMerchandises();
	}, []);`;

const deletebutton = `const openDeleteModal = () => setMerchandise(rowInfo.original);
	const openMerchandise = () => navigate('/ merchandise / { rowInfo.original.id }');
	return (
		<React.Fragment>
			<ActionIcon title="Details" type="open" onClick={openMerchandise} />
			< ActionIcon title="Delete Merchandise" type="delete" onClick={openDeleteModal} />
		</React.Fragment>
	)`;
const modal = `
<ModalOverlay
isOpen={merchandise !== null}
...
`;
const handleDelete = `
const handleDelete = React.useCallback(async () => {
		if (merchandise) {
			const response = await onboardingAPI.merchandise.deleteMerchandise(merchandise.id!)
			if (response !== null) {
				toast.success('Merchandise Deleted');
				setMerchandiseList(currentMerchandise => currentMerchandise.filter(x => x.id != merchandise.id))	// update the list to exclude the deleted one
			} else {
				merchandise.deleted = false;
				toast.error('Unable to delete Merchandise');
			}
			setMerchandise(null);
		}
	}, [merchandise])`;

const helpbuttons: helpDialog[] = [
	{
		title: 'Delete Merchandise',
		message: <div>The <span className="elementExample">ActionIcon</span> button updates the Merchandise state for the selected row.<br />
			<pre><code>{deletebutton}</code></pre>
			Once the state contains a Merchandise record, the modal becomes visible.<br />
			<pre><code>{modal}</code></pre>
			When the user clicks the <span className="elementExample">Delete</span> button on the modal,
			<span className="codeExample"> handleDelete()</span> runs which calls the <span className="codeExample">deleteMerchandise()</span> api.
			<pre><code>{handleDelete}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/merchandise/MerchandiseList.tsx&version=GBmain&line=22&lineEnd=22&lineStartColumn=2&lineEndColumn=54&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/MerchandiseService.cs&version=GBmain&line=128&lineEnd=128&lineStartColumn=2&lineEndColumn=71&lineStyle=plain&_a=contents',
	},
	{
		title: 'Data Table',
		message: <div>The columns are defined with a header (name of the column) and accessor (data field).<br />
			<pre><code>{header}</code></pre>
			The column can also include a Cell to control how the data is formatted.<br />
			<pre><code>{cell}</code></pre>
			The React.UseEffect calls the GetMerchandiseList() api and the list of Merchandise is assigned to the data parameter of the DataTable<br />
			<pre><code>{api}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/merchandise/MerchandiseList.tsx&version=GBmain&line=37&lineEnd=37&lineStartColumn=2&lineEndColumn=37&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/MerchandiseService.cs&version=GBmain&line=27&lineEnd=27&lineStartColumn=3&lineEndColumn=75&lineStyle=plain&_a=contents'
	}
];

const MerchandiseList: React.FC = () => {
	const [merchandiseList, setMerchandiseList] = React.useState<MerchandiseDTO[]>([]);
	const [merchandise, setMerchandise] = React.useState<MerchandiseDTO | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const navigate = useNavigate();

	const handleCancel = React.useCallback(() => {
		setMerchandise(null);
	}, []);

	const handleDelete = React.useCallback(async () => {
		if (merchandise) {
			const response = await onboardingAPI.merchandise.deleteMerchandise(merchandise.id!);
			if (response !== null) {
				toast.success('Merchandise Deleted');
				setMerchandiseList(currentMerchandise => currentMerchandise.filter(x => x.id != merchandise.id));	// update the list to exclude the deleted one
			} else {
				merchandise.deleted = false;
				toast.error('Unable to delete Merchandise');
			}
			setMerchandise(null);
		}
	}, [merchandise]);

	React.useEffect(() => {
		async function getMerchandises() {
			const merchandises = await onboardingAPI.merchandise.getMerchandiseList();
			if (merchandises !== null) {
				setMerchandiseList(merchandises);
			} else {
				toast.error('Unable to retrieve merchandise list');
			}
			setLoading(false);
		}
		getMerchandises();
	}, []);

	// This is defined here so that the columns array isn't recreated every time the render function is called.
	const columns = [
		{
			Header: 'Merchandise ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Item',
			accessor: 'itemName'
		},
		{
			Header: 'Donor',
			accessor: 'fullName'
		},
		{
			Header: 'Lot #',
			accessor: 'lotId'
		},
		{
			Header: 'Retail Value',
			accessor: 'retailValue',
			Cell: (row: any) => (
				<div>{Utils.formatCurrency(row.original.retailValue)}</div>
			),
		},
		{
			Header: 'Reserve Value',
			accessor: 'reserveValue',
			Cell: (row: any) => (
				<div>{Utils.formatCurrency(row.original.reserveValue)}</div>
			),
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const openDeleteModal = () => setMerchandise(rowInfo.original);
				const openMerchandise = () => navigate(`/merchandise/${rowInfo.original.id}`);
				return (
					<React.Fragment>
						<ActionIcon title="Details" type="open" onClick={openMerchandise} />
						< ActionIcon title="Delete Merchandise" type="delete" onClick={openDeleteModal} />
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
		<Page title="Merchandise List">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Merchandise List"
			/>
			<section className="container-fluid">
				<Button className="btn-info" to={'/merchandise/0'}>
					<span style={{ textTransform: 'capitalize' }}>Add New Merchandise</span>
				</Button>
				<DataTable
					data={merchandiseList}
					columns={columns}
					filterable={true}
					sortable={true}
					resizable={true}
					noDataText="No Merchandise found."
				/>
			</section>
			<ModalOverlay
				isOpen={merchandise !== null}
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

export default MerchandiseList;