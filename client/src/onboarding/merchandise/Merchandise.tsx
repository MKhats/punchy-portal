import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Button, Page, PageHero } from 'components/core';
import onboardingAPI from 'APICalls/onboardingAPI';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Label from 'components/onboarding/Label';
import ErrorMessage from 'components/onboarding/ErrorMessage';
import { Select } from 'components/core/Select';

import { Input } from 'components/core/Input';
import { TextArea } from 'components/core/TextArea';

import UploadFilesComponentHook from 'components/onboarding/uploadFilesComponentHook';
import HelpPanel from 'components/onboarding/HelpPanel';

const useform = `
const { handleSubmit, control, reset, formState: { errors } } = useForm<MerchandiseDTO>({
		defaultValues: {
			id: 0,
			...
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});`;

const control = `
<Controller
	control={control}
	name="receiptNumber"
	rules={
		{
			required: 'This field is required',
		}
	}
	aria-labelledby=""
	render={({ field, fieldState: { error } }) => (
		<div className="mb-3">
			<Label htmlFor={field.name} required={true}>Receipt Number</Label>
			<Input
				id={field.name ?? ''}
				className={classNames(error && 'is-invalid')}
				{...field}
			/>
			<ErrorMessage error={error} />
		</div>
	)
	}
/>
`;
const sub = `
<Button
	className="btn-primary m-2"
	onClick={handleSubmit(submitData)}
>
	Submit
</Button>
`;
const subdata = `
const submitData = React.useCallback(async (data: MerchandiseDTO) => {
		data.donorId = Number(data.donorOption!.value) || 0;
		data.id = merchandiseId;
		const merch = await onboardingAPI.merchandise.postMerchandise(data)
		if (merch !== null) {
			toast.success('Merchandise Saved');
			navigate('/merchandiselist');
		} else {
			toast.error('Unable to save Merchandise')
		};
	}, [merchandiseId])
`;
const upload = `
<UploadFilesComponentHook parentType="Merchandise" parentId={(merchandiseId) ? +merchandiseId : 0} disabled={false} setParentId={setMerchandiseId} />`;
const uploadtoserver = `
const newParentId: any = await UploadService.upload(file, props.parentId, props.parentType)`;
const parentid = `
if (questid == 0)
	{
		if (parenttype == DocumentParentType.Merchandise)
		{
			Merchandise merch = new Merchandise();
			merch.DateAdded = DateTime.UtcNow;
			Db.Merchandises.Add(merch);
			Db.SaveChanges();
			questid = merch.Id;
			...`;
const donorlist = `
merchandiseDTO.DonorList = await Db.Donors
	.Where(x => x.Deleted == false)
	.OrderByDescending(y=>y.FullName)
	.Select(z=>new DonorDTO()
	{
		FullName =z.FullName,
		Id = z.Id,	
	})
	.ToListAsync();`;
const donorselect = `
<Select
	id={field.name}
	value={field.value.toString()}
	value={field.value}
	options={donorList}
	onChange={field.onChange}
	placeholder="Select ..."
/>`;
const donorvalue = `
data.donorId = Number(data.donorOption!.value) || 0;`;
const helpbuttons: helpDialog[] = [
	{
		title: 'Merchandise Form',
		message: <div>The form is initialized with <span className="">useForm</span><br />
			<pre><code>{useform}</code></pre>
			Each field uses a <span className="codeExample">Controller</span>, where we define the data field, validation rules and updates
			<pre><code>{control}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/merchandise/Merchandise.tsx&version=GBmain&line=43&lineEnd=43&lineStartColumn=2&lineEndColumn=92&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/MerchandiseService.cs&version=GBmain&line=79&lineEnd=79&lineStartColumn=3&lineEndColumn=68&lineStyle=plain&_a=contents',
	},
	{
		title: 'Submit Merchandise',
		message: <div>The submit button runs <span className="codeExample">handleSubmit()</span> (part of useForm).<br />
			<pre><code>{sub}</code></pre>
			<span className="codeExample">handleSubmit()</span> performs validation checks, and then runs <span className="codeExample">submitData()</span> and posts Bidder data to the api
			<pre><code>{subdata}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/merchandise/Merchandise.tsx&version=GBmain&line=45&lineEnd=45&lineStartColumn=2&lineEndColumn=72&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/MerchandiseService.cs&version=GBmain&line=55&lineEnd=55&lineStartColumn=3&lineEndColumn=66&lineStyle=plain&_a=contents'
	},
	{
		title: 'Donor Select',
		message: <div>Select is populated by an array of Donors included in the MerchandiseDTO returned by the api call.<br />
			<pre><code>{donorlist}</code></pre>
			The donor list is assigned to the select
			<pre><code>{donorselect}</code></pre>
			The selected Donor is assigned to the <span className="codeExample">donorId</span> parameter on the MerchandiseDTO.<br />
			This value is passed to the select component.

		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/merchandise/Merchandise.tsx&version=GBmain&line=45&lineEnd=45&lineStartColumn=2&lineEndColumn=72&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/MerchandiseService.cs&version=GBmain&line=55&lineEnd=55&lineStartColumn=3&lineEndColumn=66&lineStyle=plain&_a=contents'
	},
	{
		title: 'Upload Files',
		message: <div>Upload component is used for uploading files.<br />
			<pre><code>{upload}</code></pre>
			Define the ParentType (Merchandise) and the current merchandise Id (send 0 if a new unsaved merchandise)<br />
			The file and associated parenttype and parentId is uploaded to the server.
			<pre><code>{uploadtoserver}</code></pre>
			The server returns the id of the parent.  (if this is a new Merchandise, it returns a new Id value)
			<pre><code>{parentid}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/merchandise/Merchandise.tsx&version=GBmain&line=286&lineEnd=286&lineStartColumn=5&lineEndColumn=155&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/DocumentService.cs&version=GBmain&line=45&lineEnd=45&lineStartColumn=3&lineEndColumn=55&lineStyle=plain&_a=contents'
	}
];

const Merchandise: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState<boolean>(true);
	const [donorList, setDonorList] = React.useState<SelectOptionDTO[]>();
	const [merchandiseId, setMerchandiseId] = React.useState(0);
	const form = useForm<MerchandiseDTO>({
		defaultValues: {
			id: 0,
			receiptNumber: '',
			itemName: '',
			lotId: '',
			description: '',
			specialConditions: '',
			certificateInfo: '',
			hasCertificate: false,
			retailValue: 0,
			reserveValue: 0,
			salePrice: 0,
			donorId: 0,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});
	const { handleSubmit, control, reset, formState: { errors } } = form;

	const submitData = React.useCallback(async (data: MerchandiseDTO) => {
		data.id = merchandiseId;
		const merch = await onboardingAPI.merchandise.postMerchandise(data);
		if (merch !== null) {
			toast.success('Merchandise Saved');
			navigate('/merchandise/merchandiselist');
		} else {
			toast.error('Unable to save Merchandise');
		};
	}, [merchandiseId]);
	React.useEffect(() => {
		async function getMerchandise(merchandiseid: number) {
			const merchandise = await onboardingAPI.merchandise.getMerchandise(merchandiseid);
			if (merchandise !== null) {
				const donorlist: SelectOptionDTO[] = merchandise.donorList!.map((x: any) => {
					return {
						value: x.id.toString(),
						label: x.fullName
					};
				});
				setDonorList(donorlist);
				setMerchandiseId(merchandise.id!);
				reset(merchandise);
			} else {
				toast.error('Unable to retrieve Merchandise information');
			}
			setLoading(false);
		}
		getMerchandise(Number(params.merchandiseId));
	}, []);
	if (loading) {
		return null;
	}
	return (
		<Page title="Merchandise">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Merchandise Details"
			/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<Controller
							control={control}
							name="receiptNumber"
							rules={
								{
									required: 'This field is required',
								}
							}
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name} required={true}>Receipt Number</Label>
									<Input
										id={field.name ?? ''}
										className={classNames(error && 'is-invalid')}
										{...field}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="itemName"
							aria-labelledby=""
							rules={
								{
									required: 'This field is required',
								}
							}
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name} required={true}>Item</Label>
									<Input
										id={field.name}
										className={classNames(error && 'is-invalid')}
										{...field}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="donorId"
							rules={
								{
									required: 'This field is required',
								}
							}
							aria-labelledby=""
							render={({ field }) =>
								<div className="mb-3">
									<Label htmlFor={field.name}>Donor</Label>
									<Select
										id={field.name}
										name={field.name}
										value={field.value.toString()}
										options={donorList}
										onChange={field.onChange}
										placeholder="Select ..."
									/>
								</div>
							}
						/>

					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="lotId"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Lot #</Label>
									<Input
										id={field.name}
										className={classNames(error && 'is-invalid')}
										{...field}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<Controller
							control={control}
							name="description"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Description</Label>
									<TextArea
										id={field.name}
										className={classNames('form-control', error && 'is-invalid')}
										{...field}
									>
									</TextArea>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
					<div className="col-lg-6">
						<Controller
							control={control}
							name="specialConditions"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Special Conditions</Label>
									<textarea
										id={field.name}
										className={classNames('form-control', error && 'is-invalid')}
										{...field}
									>
									</textarea>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4">
						<Controller
							control={control}
							name="retailValue"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Retail Value</Label>
									<Input
										type="number"
										id={field.name}
										className={classNames(error && 'is-invalid')}
										{...field}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
					<div className="col-lg-4">
						<Controller
							control={control}
							name="reserveValue"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Reserve Value</Label>
									<Input
										type="number"
										id={field.name}
										className={classNames(error && 'is-invalid')}
										{...field}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
					<div className="col-lg-4">
						<Controller
							control={control}
							name="salePrice"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Sale Price</Label>
									<Input
										type="number"
										id={field.name}
										className={classNames(error && 'is-invalid')}
										{...field}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
				</div>
				<div className="row">
					<UploadFilesComponentHook parentType="Merchandise" parentId={(merchandiseId) ? +merchandiseId : 0} disabled={false} setParentId={setMerchandiseId} />
				</div>
				<Button
					className="btn-primary"
					style={{ margin: 10 }}
					onClick={handleSubmit(submitData)}
				>
					Submit
				</Button>
				<Button
					className="btn-info"
					style={{ margin: 10 }}
					onClick={() => {
						navigate('/merchandise/merchandiselist');
					}}
				>
					Cancel
				</Button>
			</div>

		</Page>
	);
};

export default Merchandise;
