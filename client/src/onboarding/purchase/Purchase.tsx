/* eslint-disable react/no-deprecated */
import React from 'react';
import onboardingAPI from 'APICalls/onboardingAPI';
import { DataTable, ModalOverlay, Page, PageHero } from 'components/core';

import { DateTime } from 'luxon';
import { ActionIcon } from 'components/core/ActionColumnIconsAndButton';
import { toast } from 'react-toastify';
import PurchaseItemComponent from '../../components/onboarding/PurchaseItemComponent';
import HelpPanel from 'components/onboarding/HelpPanel';

const selectlist = `
purch.MerchandiseList = await Db.Merchandises
		.Where(x => x.Deleted == false)
		.OrderBy(y => y.ItemName)
		.Select(z => new MerchandiseDTO()
		{
			Id = z.Id,
			ItemName = z.ItemName,
		}).ToListAsync();
purch.BidderList = await Db.Bidders
		.Where(x => x.Deleted == false)
		.OrderBy(y => y.FullName)
		.Select(z => new BidderDTO()
		{
			Id = z.Id,
			FullName = z.FullName,
		}).ToListAsync();`;

const purchasecomponent = `
<PurchaseItemComponent onSubmit={submitData} bidderList={purchases.bidderList!} merchandiseList={purchases.merchandiseList!} />`;
const select = `
<Select
	id={field.name}
	name={field.name}
	value={field.value}
	options={props.merchandiseList!.map((x, i) => {
		return {
			value: x.id,
			label: x.itemName
		}
	})}
	onChange={field.onChange}
	placeholder="Select ..."
/>`;
const sub = `
const submitData = React.useCallback(async (data: PurchaseDTO) => {
		const purchase = await onboardingAPI.purchase.postPurchase(data)`;
const code = `
Purchase purchase = request.ConvertTo<Purchase>();
	purchase.BidderId = Int32.Parse(request.BidderOption.value);
	purchase.MerchandiseId = Int32.Parse(request.MerchandiseOption.value);
	
	Purchase pur = await Db.Purchases.FindAsync(request.Id);
	if (pur == null)
	{
		pur = new Purchase()
		{
			PurchaseDate = DateTime.Now
		};
		Db.Purchases.Add(pur);
	}`;
const sendemail = `
<Label htmlFor={field.name} >Send Email</Label>
							<Checkbox
								type="checkbox"
								id="sendEmail"
								className={classNames(error && 'is-invalid')}
								{...field}
							/>`;
const requestsendemail = `
if (request.SendEmail == true)
				{
					SendPurchaseEmail(pur);
				}`;
const sendgrid = `
Dictionary<string, string> messageParameters = new Dictionary<string, string>();
				var sendgridClient = new SendGridClient(_sendGridSettings.APIKey);
				var email = new SendGridMessage
				{
					From = new EmailAddress(_sendGridSettings.AddressFrom),
					TemplateId = _sendGridSettings.PurchaseTemplateId,
				};
				string itemname = Db.Merchandises.Where(x => x.Id == purchase.MerchandiseId).Select(y => y.ItemName).FirstOrDefault();
				messageParameters.Add("itemname",itemname);
				messageParameters.Add("price", purchase.Price.ToString("C"));
				email.SetTemplateData(messageParameters);
				string emailaddress = Db.Bidders.Where(x=>x.Id==purchase.BidderId).Select(y=>y.Email).FirstOrDefault();
				if (emailaddress!= null)
				{
					email.AddTo(emailaddress);
				}
				var response = await sendgridClient.SendEmailAsync(email);`;
const helpbuttons: helpDialog[] = [
	{
		title: 'Purchase Item',
		message: <div>The <span className="elementExample">Select</span> controls for Bidder and Merchandise are populated by lists included in the PurchaseDTO
			<pre><code>{selectlist}</code></pre>
			The Bidder and Merchandise lists are passed to the <span className="elementExample">PurchaseitemComponent</span> component
			<pre><code>{purchasecomponent}</code></pre>
			The select controls in the component are populated with the ToListAsync
			<pre><code>{select}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/purchase/Purchase.tsx&version=GBmain&line=53&lineEnd=53&lineStartColumn=2&lineEndColumn=25&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/PurchaseService.cs&version=GBmain&line=36&lineEnd=36&lineStartColumn=3&lineEndColumn=64&lineStyle=plain&_a=contents',
	},
	{
		title: 'Submit Purchase',
		message: <div>The submit button runs <span className="codeExample">handleSubmit()</span> passed to the  <span className="elementExample">PurchaseitemComponent</span> component.<br />
			<pre><code>{sub}</code></pre>
			<span className="codeExample">handleSubmit()</span> performs validation checks, and then runs <span className="codeExample">submitData()</span> and posts Purchase data to the api
			<pre><code>{code}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/purchase/Purchase.tsx&version=GBmain&line=42&lineEnd=42&lineStartColumn=2&lineEndColumn=69&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/BidderService.cs&version=GBfeature/biddersearch&line=70&lineEnd=70&lineStartColumn=3&lineEndColumn=56&lineStyle=plain&_a=contents'
	},
	{
		title: 'Send Email',
		message: <div>When the <span className="elementExample">Send Email</span> checkbox is checked, an email is sent to the Bidder.<br />
			<pre><code>{sendemail}</code></pre>
			On the server, if checked, an email is sent to the Bidder.
			<pre><code>{requestsendemail}</code></pre>
			Puchase information is added to the email and sent via SendGrid
			<pre><code>{sendgrid}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/purchase/Purchase.tsx&version=GBmain&line=42&lineEnd=42&lineStartColumn=2&lineEndColumn=69&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/PurchaseService.cs&version=GBmain&line=120&lineEnd=120&lineStartColumn=3&lineEndColumn=65&lineStyle=plain&_a=contents'
	}
];


const defaultPurchases: PurchasesDTO = {
	purchaseList: [],
	merchandiseList: [],
	bidderList: [],
};
const PurchaseList: React.FC = () => {

	const [purchases, setPurchases] = React.useState<PurchasesDTO>(defaultPurchases);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [purchaseId, setPurchaseId] = React.useState<number | null>(null);
	const [listKey, setListKey] = React.useState(Math.random());

	const handleCancel = React.useCallback(() => {
		setPurchaseId(null);
	}, []);

	const handleDelete = React.useCallback(async () => {
		const purchase = purchases.purchaseList!.filter(x => x.id == purchaseId)[0];
		if (purchase) {
			const response = onboardingAPI.purchase.deletePurchase(purchase);
			if (response != null) {
				toast.success('Purchase Deleted');
				setPurchases({ ...purchases, purchaseList: purchases.purchaseList!.filter(x => x.id != purchaseId) });	// update the list to exclude the deleted one
			} else {
				toast.error('Unable to delete Purchase');
			}
			setPurchaseId(null);
		}
	}, [purchaseId, purchases]);

	const submitData = React.useCallback(async (data: PurchaseDTO) => {
		const purchase = await onboardingAPI.purchase.postPurchase(data);
		if (purchase !== null) {
			setListKey(Math.random());
			toast.success('Purchase Saved');
		} else {
			toast.error('Unable to save Purchase');
		}
	}, []);

	React.useEffect(() => {
		async function getPurchases() {
			const purchases = await onboardingAPI.purchase.getPurchaseList();
			if (purchases !== null) {
				setPurchases(purchases);
			} else {
				toast.error('Unable to retrieve Purchases');
			}
			setLoading(false);
		}
		getPurchases();
	}, [listKey]);

	// This is defined here so that the columns array isn't recreated every time the render function is called.
	const columns = [
		{
			Header: 'Purchase ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Bidder',
			accessor: 'fullName'
		},
		{
			Header: 'Item',
			accessor: 'itemName'
		},
		{
			Header: 'Date',
			accessor: 'purchaseDate',
			Cell: (rowInfo: any) => {
				const dt = DateTime.fromISO(rowInfo.value);
				return dt.toLocaleString(DateTime.DATETIME_MED);
			},
		},
		{
			Header: 'Price',
			accessor: 'price'
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const openDeleteModal = () => setPurchaseId(rowInfo.original.id);
				return (
					<React.Fragment>
						< ActionIcon title="Delete Feedback" type="delete" onClick={openDeleteModal} />
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
		<Page title="Purchase List">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Purchase List"
			/>
			<section className="container-fluid">
				<PurchaseItemComponent onSubmit={submitData} bidderList={purchases.bidderList!} merchandiseList={purchases.merchandiseList!} />
			</section>
			<section className="container-fluid">
				<DataTable
					data={purchases.purchaseList}
					columns={columns}
					filterable={true}
					sortable={true}
					resizable={true}
					noDataText="No purchases found."
				/>
			</section>
			<ModalOverlay
				isOpen={purchaseId !== null}
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

export default PurchaseList;