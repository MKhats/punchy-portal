import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, DropdownInput, RadioGroup, CheckboxGroup, Input, Page, FormGroup, PageHero } from 'components/core';

/** FORM_CLEAR_STATE
 * This is the biggest flaw I found with this library, having to explicitly
 * clear all the fields to trigger them to clear their state (setting to null)
 */
const FORM_CLEAR_STATE = {
	formElement1: '',
	formElement3: [],
	formElement4: ''
} as any;

// Define your form interface first
interface FormExample {
	formElement1: string;
	formElement2: { value: string, label: string };
	formElement3: string[];
	formElement4: string;
}
const FormExample = () => {
	// initialize form
	const { handleSubmit, control, reset } = useForm<FormExample>({
		defaultValues: {
			formElement1: 'This should disapear after 3 seconds'
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	// const formElement1Error = (errors && errors.formElement1)
	// 	? errors.formElement1.message
	// 	: undefined;

	// reinitializing the form defaults
	useEffect(() => {
		const simulateNetworkDelayGet = () => {
			setTimeout(() => {
				const newDefaultValues = { ...FORM_CLEAR_STATE, formElement1: 'Simulated late initialized value' };
				reset(newDefaultValues); // clear and reinitialize form with new default values
			}, 3000);
		};
		simulateNetworkDelayGet();
	}, [reset]);

	return (
		<Page>
			<PageHero title="Form Controls Example" />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<Controller
							control={control}
							name="formElement1"
							rules={{ validate: val => val === 'sunny' ? 'Can\'t be this' : true }}
							render={({ field, fieldState }) =>
								<FormGroup label="Text input Example" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-6">
						<label>Picklisted Dropdown Example</label>
						<Controller
							control={control}
							name="formElement2"
							render={({ field, fieldState }) =>
								<FormGroup label="CheckboxGroup Example" field={field} fieldState={fieldState}>
									<DropdownInput
										{...field}
										pickListCode="OrderMethod"
										isMulti={true}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-6">
						<Controller
							control={control}
							name="formElement3"
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
							render={({ field, fieldState }) =>
								<FormGroup label="CheckboxGroup Example" field={field} fieldState={fieldState}>
									<CheckboxGroup
										onChange={field.onChange}
										value={field.value}
										options={OPTIONS}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-6">
						<Controller
							control={control}
							name="formElement4"
							rules={{
								required: 'You must choose an option'
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="RadioGroup Example" field={field} fieldState={fieldState}>
									<RadioGroup
										value={field.value}
										onChange={field.onChange}
										options={OPTIONS}
									/>
								</FormGroup>
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
					className="btn-outline-primary ms-3"
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
export default FormExample;

const OPTIONS = [
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