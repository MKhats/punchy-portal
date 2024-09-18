import React from 'react';
import { Controller, useForm, } from 'react-hook-form';
import classNames from 'classnames';
import { Button } from 'components/core/Button';
import { Select } from 'components/core/Select';

import Label from 'components/onboarding/Label';
import ErrorMessage from 'components/onboarding/ErrorMessage';
import { Input } from 'components/core/Input';
import Checkbox from 'components/core/CheckBox';




const defaultOption: SelectOptionDTO = {
	value: '',
	label: '',
};
interface IItemProps {
	onSubmit: (item: PurchaseDTO) => void;
	bidderList: BidderDTO[];
	merchandiseList: MerchandiseDTO[];
}

const PurchaseItemComponent = (props: IItemProps) => {
	const { handleSubmit, control, reset, formState: { errors } } = useForm<PurchaseDTO>({
		defaultValues: {
			id: 0,
			purchaseDate: '',
			bidderOption: undefined,
			fullName: '',
			merchandiseOption: undefined,
			itemName: '',
			price: 0,
			comment: '',
			paymentId: 0,
			sendEmail: ''
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});
	return (
		<div className="row">
			<div className="col-lg-3">
				<Controller
					control={control}
					name="bidderOption"
					aria-labelledby=""
					rules={
						{
							required: 'This field is required',
							validate: option => option! !== undefined
						}
					}
					render={({ field, fieldState: { error } }) =>
						<div className="mb-3">
							<Label htmlFor={field.name} required={true}>Bidder</Label>
							<Select
								id={field.name}
								name={field.name}
								value={field.value}
								options={props.bidderList!.map((x) => {
									return {
										value: x.id,
										label: x.fullName
									};
								})}
								onChange={field.onChange}
								placeholder="Select ..."
							/>
							<ErrorMessage error={error} />
						</div>
					}
				/>
			</div>
			<div className="col-lg-3">
				<Controller
					control={control}
					name="merchandiseOption"
					aria-labelledby=""
					rules={
						{
							required: 'This field is required',
							validate: option => {
								const hasValue = option! !== undefined;
								if (hasValue === false) {
									return 'This field is required';
								}
								return hasValue;
							}
						}
					}
					render={({ field, fieldState: { error } }) =>
						<div className="mb-3">
							<Label htmlFor={field.name} required={true}>Merchandise Item</Label>
							<Select
								id={field.name}
								name={field.name}
								value={field.value}
								options={props.merchandiseList!.map((x) => {
									return {
										value: x.id,
										label: x.itemName
									};
								})}
								//onChange={handleSelectChange}
								onChange={field.onChange}
								placeholder="Select ..."
							/>
							<ErrorMessage error={error} />
						</div>
					}
				/>
			</div>
			<div className="col-lg-2">
				<Controller
					control={control}
					name="price"
					rules={
						{
							required: 'This field is required',
							min: 1
						}
					}
					aria-labelledby=""
					render={({ field, fieldState: { error } }) => (
						<div className="mb-3">
							<Label htmlFor={field.name} required={true}>Price</Label>
							<Input
								type="number"
								id="Price"
								className={classNames(error && 'is-invalid')}
								{...field}
							/>
							<ErrorMessage error={error} />
						</div>
					)
					}
				/>
			</div>
			<div className="col-lg-1">
				<Controller
					control={control}
					name="sendEmail"
					aria-labelledby=""
					render={({ field, fieldState: { error } }) => (
						<div className="mb-3">
							<Label htmlFor={field.name} >Send Email</Label>
							<Checkbox
								type="checkbox"
								id="sendEmail"
								className={classNames(error && 'is-invalid')}
								{...field}
							/>
							<ErrorMessage error={error} />
						</div>
					)
					}
				/>
			</div>
			<div className="col-lg-3 mt-3">
				<Button
					className="btn-info"
					style={{ margin: 10 }}
					onClick={handleSubmit(data => {
						props.onSubmit(data);
						reset();
					})}
				>
					Add Purchase
				</Button>
			</div>

		</div>
	);
};

export default PurchaseItemComponent;