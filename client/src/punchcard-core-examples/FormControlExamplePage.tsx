import React from 'react';
import { Button, Checkbox, CheckboxGroup, FormGroup, Input, Page, PageHero, RadioGroup, Select, TextArea } from 'components/core';
import { Controller, useForm } from 'react-hook-form';

const FORM_CLEAR_STATE = {
	textInput: '',
	requiredInput: '',
	disabledInput: '',
	readOnlyInput: '',
	addOnInput: '',
	numberInput: '',
	emailInput: '',
	textAreaInput: '',
	checkboxGroup: [],
	checkbox: '',
	radioGroup: '',
} as any;

interface FormExample {
	textInput: string;
	requiredInput: string;
	disabledInput: string;
	readOnlyInput: string;
	addOnInput: string;
	numberInput: number;
	emailInput: string;
	textAreaInput: string;
	select: { value: string, label: string };
	checkboxGroup: string[];
	checkbox: string;
	radioGroup: string;
}

const FormControlExamplePage = () => {
	const { handleSubmit, control, reset } = useForm<FormExample>({
		defaultValues: {
			readOnlyInput: 'This is readonly'
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const iceCreamOptions = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{
			label:
				'Option 3 that has a very long label, so long that it should wrap into a new line or maybe even multiple lines',
			value: 'option3'
		},
		{
			label: 'Postal Code Option',
			value: 't6k2k5'
		}
	];

	return (
		<Page title="Form Control Example">
			<PageHero title="Form Controls Examples" />
			<div className="container-fluid">
				<h2 className="pc-bordered-title">Standard inputs</h2>
				<div className="row">
					<div className="col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="textInput"
							rules={{ validate: val => val === 'sunny' ? 'Can\'t be this' : true }}
							render={({ field, fieldState }) =>
								<FormGroup label="Text Input" field={field} fieldState={fieldState}>
									<Input
										{...field}
									/>
								</FormGroup>
							}
						/>
					</div>

					<div className="form-group col-lg-4 col-xl-3">
						<label>Required Input</label>
						<Controller
							control={control}
							name="requiredInput"
							rules={{ required: 'You must enter a value' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Required Input" required={true} field={field} fieldState={fieldState}>
									<Input
										{...field}
									/>
								</FormGroup>
							}
						/>
					</div>


					<div className="col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="disabledInput"
							render={({ field, fieldState }) =>
								<FormGroup label="Disabled Input" field={field} fieldState={fieldState}>
									<Input
										disabled={true}
										{...field}
									/>
								</FormGroup>

							}
						/>
					</div>

					<div className="form-group col-lg-4 col-xl-3">
						<Controller
							control={control}
							name="readOnlyInput"
							render={({ field, fieldState }) =>
								<FormGroup label="Read only field" field={field} fieldState={fieldState}>
									<Input
										readOnly={true}
										{...field}
									/>
								</FormGroup>

							}
						/>
					</div>

					<div className="form-group col-lg-4 col-xl-3">
						<label>Addon Input</label>
						<Controller
							control={control}
							name="addOnInput"
							render={({ field }) =>
								<Input
									type="text"
									className="form-control"
									id="addOnInput"
									name={field.name}
									value={field.value}
									onChange={field.onChange}
									placeholder="Value"
									prepend="Pre"
									append="Post"
								/>

							}
						/>
					</div>

					<div className="form-group col-lg-4 col-xl-3">
						<label>Number Input</label>
						<Controller
							control={control}
							name="numberInput"
							render={({ field }) =>
								<Input
									type="number"
									className="form-control"
									id="numberInput"
									name={field.name}
									value={field.value}
									onChange={field.onChange}
									placeholder="Value"
								/>

							}
						/>
					</div>

					<div className="form-group col-lg-4 col-xl-3">
						<label>Email Input</label>
						<Controller
							control={control}
							name="emailInput"
							rules={{

								validate: (emailEntered: string | undefined) => {
									if (emailEntered === undefined || emailEntered.length === 0) {
										return 'Email is required';
									}

									// eslint-disable-next-line max-len
									const isEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailEntered) === true;
									if (isEmail === false) {
										console.log('not an email');
										return 'Not an email address';
									}

									return true;
								}
							}}
							render={({ field }) =>
								<Input
									type="email"
									className="form-control"
									id="emailInput"
									name={field.name}
									value={field.value}
									onChange={field.onChange}
									placeholder="Value"
								/>

							}
						/>
						<div className="form-group">
							<label>Text Area Input</label>
							<Controller
								control={control}
								name="textAreaInput"
								render={({ field }) =>
									<TextArea
										className="form-control"
										id="textAreaInput"
										name={field.name}
										value={field.value}
										onChange={field.onChange}
										placeholder="Value"
										rows={5}
									/>

								}
							/>
						</div>
					</div>

				</div>
				<h2 className="pc-bordered-title">Select</h2>
				<div className="row">
					<div className="form-group col-lg-4 col-xl-3">
						<label>Select</label>
						<Controller
							control={control}
							name="select"
							render={({ field }) =>
								<Select
									id="select"
									name={field.name}
									value={field.value}
									options={iceCreamOptions}
									onChange={field.onChange}
									placeholder="Select your ice cream flavour..."
								/>
							}
						/>
					</div>
				</div>

				<h2 className="pc-bordered-title">Checkboxes, Radios</h2>
				<div className="row">
					<div className="form-group col-lg-4 col-xl-3">
						<label>Checkbox</label>
						<Controller
							control={control}
							name="checkbox"
							render={({ field }) =>
								<Checkbox
									name={field.name}
									value={field.value}
									onChange={field.onChange}
								/>
							}
						/>
					</div>

					<div className="form-group col-lg-4 col-xl-3">
						<label>Checkbox group</label>
						<Controller
							control={control}
							name="checkboxGroup"
							rules={{

								validate: (selectedValues: any[] | undefined) => {
									if (!selectedValues || selectedValues.length < 1) {
										return 'This field is required';
									}

									if (selectedValues && !selectedValues.find(sv => /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(sv))) {
										return 'At least one of these answers must be a postal code';
									}

									return true;
								}
							}}
							render={({ field }) =>
								<CheckboxGroup
									name={field.name}
									value={field.value}
									options={options}
									onChange={field.onChange}
								/>
							}
						/>
					</div>


					<div className="form-group col-lg-4 col-xl-3">
						<label>Radio group</label>
						<Controller
							control={control}
							name="radioGroup"
							rules={{
								required: 'You must choose an option'
							}}

							render={({ field }) =>
								<RadioGroup
									name={field.name}
									value={field.value}
									options={options}
									onChange={field.onChange}
								/>
							}
						/>
					</div>
				</div>

				<Button
					className="btn-primary"
					onClick={handleSubmit(submitForm)}
				>
					Submit
				</Button>

				<Button
					className="btn-primary"
					onClick={resetForm}
				>
					Re-initialize
				</Button>
			</div>
		</Page>
	);

	function submitForm(values: FormExample) {
		JSON.stringify(values);
	}
	function resetForm() {
		const newDefaultValues = { ...FORM_CLEAR_STATE, textInput: 'Re-initialized value' };
		/***
			 * NOTE: FORM_CLEAR_STATE is required here to reset reset/clear your form components state,
			 * because only fields that are set as NOT undefined trigger a rerender in their Controller
			 * so `const newDefaultValues = { textInput: 'Re-initialized value' };` will not work
			 */
		reset(newDefaultValues); // clear and reinitialize form with new default values
	}
};

export default FormControlExamplePage;
