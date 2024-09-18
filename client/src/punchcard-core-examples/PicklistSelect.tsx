import React from 'react';
import { Button, FormGroup, Page, PageHero, PickListSelect } from 'components/core';
import { Controller, useForm } from 'react-hook-form';

interface FormExample {
	multiPicklist?: string[];
	singlePicklist?: string;
}

const PickListSelectExample = () => {
	const { control, handleSubmit } = useForm<FormExample>();
	return (
		<Page>
			<PageHero title="Picklist Select Example" />
			<div className="container-fluid">

				<Controller
					control={control}
					name="multiPicklist"
					rules={{
						required: 'This is a required field',
					}}
					render={({field, fieldState}) =>
						<FormGroup label="Select the provinces you want to live in" field={field} fieldState={fieldState}>
							<PickListSelect
								isMulti={true}
								picklistTypeCode="Province"
								onChange={field.onChange}
								value={field.value}
								filterOptions={['QC']} // Can't select Quebec
								error={!!fieldState.error?.message}
							/>
						</FormGroup>
					}
				/>
				<Controller
					control={control}
					name="singlePicklist"
					rules={{
						required: 'This is a required field',
					}}
					render={({field, fieldState}) =>
						<FormGroup label="Select the province you don't want to live in" field={field} fieldState={fieldState}>
							<PickListSelect
								onChange={field.onChange}
								value={field.value}
								error={!!fieldState.error?.message}
								picklistTypeCode="Province"
								filterOptions={['AB']} // filter out AB from the options
							/>
						</FormGroup>
					}
				/>
				<Button className="btn-primary" onClick={handleSubmit(submitForm)}>Submit</Button>
			</div>
		</Page>
	);
	function submitForm(fields: FormExample) {
		console.log({fields});
	}
};
export default PickListSelectExample;
