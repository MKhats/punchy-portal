import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Button, Page, PageHero } from 'components/core';
import onboardingAPI from 'APICalls/onboardingAPI';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Label from 'components/onboarding/Label';
import ErrorMessage from 'components/onboarding/ErrorMessage';
import { Validation } from 'utils/utils';
import { Input } from 'components/core/Input';
import HelpPanel from 'components/onboarding/HelpPanel';

const useform = `
const { handleSubmit, control, reset, formState: { errors } } = useForm<BidderDTO>({
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
	name="fullName" //name of field in the database
	rules={
		{
			required: 'This field is required',
		}
	}
	aria-labelledby=""
	render={({ field, fieldState: { error } }) => (
		<div className="form-group mb-3">
			<Label htmlFor={field.name} required={true}>Bidder Name</Label>
			<Input
				id={field.name}
				className={classNames(error && 'is-invalid')}
				{...field}	// manages the initial value and updated values.
			/>
			<ErrorMessage error={error} />	// displays error message when validation fails
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
const submitData = React.useCallback(async (data: DonorDTO) => {
	const bidder = await onboardingAPI.bidder.postBidder(data)
	if (bidder !== null) {
		toast.success('Bidder Saved');
		navigate('/bidderlist');
	}
	else {
		toast.error('Unable to save Bidder');
	}
	setLoading(false);
}, [])
`;
const helpbuttons: helpDialog[] = [
	{
		title: 'Bidder Form',
		message: <div>The form is initialized with <span className="">useForm</span><br />
			<pre><code>{useform}</code></pre>
			Each field uses a <span className="codeExample">Controller</span>, where we define the data field, validation rules and updates
			<pre><code>{control}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/bidder/Bidder.tsx&version=GBfeature/biddersearch&line=20&lineEnd=20&lineStartColumn=2&lineEndColumn=86&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/BidderService.cs&version=GBfeature/biddersearch&line=92&lineEnd=92&lineStartColumn=3&lineEndColumn=58&lineStyle=plain&_a=contents',
	},
	{
		title: 'Submit Bidder',
		message: <div>The submit button runs <span className="codeExample">handleSubmit()</span> (part of useForm).<br />
			<pre><code>{sub}</code></pre>
			<span className="codeExample">handleSubmit()</span> performs validation checks, and then runs <span className="codeExample">submitData()</span> and posts Bidder data to the api
			<pre><code>{subdata}</code></pre>
		</div>,
		link: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/client/src/onboarding/bidder/Bidder.tsx&version=GBfeature/biddersearch&line=36&lineEnd=36&lineStartColumn=2&lineEndColumn=67&lineStyle=plain&_a=contents',
		linkapi: 'https://punchcard.visualstudio.com/Punchcard%20Core%20V2/_git/Punchcard%20Core%20Onboarding?path=/Server/Server.ServiceInterface/CoreProject/BidderService.cs&version=GBfeature/biddersearch&line=70&lineEnd=70&lineStartColumn=3&lineEndColumn=56&lineStyle=plain&_a=contents'
	}
];


const Bidder: React.FC = () => {
	const params = useParams()
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState<boolean>(true);
	const { handleSubmit, control, reset, formState: { errors } } = useForm<BidderDTO>({
		defaultValues: {
			id: 0,
			tableNumber: '',
			fullName: '',
			address: '',
			postalCode: '',
			city: '',
			province: '',
			mobilePhone: '',
			email: ''
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const submitData = React.useCallback(async (data: BidderDTO) => {
		const bidder = await onboardingAPI.bidder.postBidder(data);
		if (bidder !== null) {
			toast.success('Bidder Saved');
			navigate('/bidder/bidderlist');
		}
		else {
			toast.error('Unable to save Bidder');
		}
		setLoading(false);
	}, []);

	React.useEffect(() => {
		async function getBidder(bidderid: number) {
			const bidder = await onboardingAPI.bidder.getBidder(bidderid);
			if (bidder !== null) {
				reset(bidder);
			} else {
				toast.error('Unable to retrieve bidder information');
			}
			setLoading(false);
		};
		getBidder(Number(params.bidderId));
	}, []);
	if (loading) {
		return null;
	}
	return (
		<Page title="Bidder">
			<HelpPanel helpButtons={helpbuttons} />
			<PageHero
				className="d-flex"
				title="Bidder Details"
			/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<Controller
							control={control}
							name="fullName"
							rules={
								{
									required: 'This field is required',
								}
							}
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name} required={true}>Bidder Name</Label>
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
					<div className="col-lg-6">
						<Controller
							control={control}
							name="tableNumber"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name}>Table Number</Label>
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
					<div className="form-group col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="address"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name}>Address</Label>
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
					<div className="form-group col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="city"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name}>City</Label>
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
					<div className="form-group col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="province"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name}>Province</Label>
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
					<div className="form-group col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="postalCode"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name}>Postal Code</Label>
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
							name="homePhone"
							rules={
								{
									required: 'This field is required',
								}
							}
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name} required={true}>Phone Number</Label>
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
					<div className="form-group col-lg-3 col-xl-6">
						<Controller
							control={control}
							name="mobilePhone"
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name}>Mobile Number</Label>
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

					<div className="col-lg-6">
						<Controller
							control={control}
							name="email"
							rules={{
								required: 'Enter your email address',
								validate: (value) => {
									const mess = Validation.validateEmail(value).message;
									if (mess === '') {
										return undefined;
									} else {
										return mess;
									}
								}
							}}
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="form-group mb-3">
									<Label htmlFor={field.name} required={true}>Email Address</Label>
									<Input
										type="email"
										id={field.name}
										className={classNames(error && 'is-invalid')}
										{...field}
									// onChange={field.onChange}
									// value={field.value}
									/>
									<ErrorMessage error={error} />
								</div>
							)
							}
						/>
					</div>
				</div>
				<Button
					className="btn-primary m-2"
					onClick={handleSubmit(submitData)}
				>
					Submit
				</Button>

				<Button
					className="btn-info m-2"
					onClick={() => {
						navigate('/bidder/bidderlist');
					}}
				>
					Cancel
				</Button>
			</div>
		</Page>
	);
};


export default Bidder;