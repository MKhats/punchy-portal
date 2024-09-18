import React from 'react';
import pickListAPI from 'api/pickListAPI';
import { FormGroup, Page, PageHero } from 'components/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, RadioGroup } from 'components/core';



const PickListTypeForm = () => {
	const [pickListType, setPickListType] = useState<PickListTypeRequest>();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const { handleSubmit, control, setValue } = useForm<PickListTypeRequest>({
		defaultValues: {
			code: '',
			description: '',
			isActive: true,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const { pickListTypeId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (pickListTypeId && pickListTypeId !== '0') {
			pickListAPI.getPickListType(pickListTypeId)
				.then((resp) => {
					setPickListType(resp);
					setIsDisabled(false);
				});
		}
		else {
			setIsDisabled(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (pickListType !== undefined) {
			setValue('code', pickListType.code!);
			setValue('description', pickListType.description!);
			setValue('isActive', pickListType.isActive);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pickListType]);

	const isActiveOptions = [{ label: 'Active', value: true }, { label: 'Inactive', value: false }];

	return (
		<Page>
			<PageHero title={`${pickListTypeId === '0' ? 'Add' : 'Edit'} picklist type`} />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<Controller
							control={control}
							name="code"
							rules={{ required: 'Enter in a picklist type code' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Picklist Code" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
										disabled={isDisabled}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="description"
							rules={{ required: 'Enter in a picklist type description' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Picklist description" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
										disabled={isDisabled}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-md-3">
						<Controller
							control={control}
							name="isActive"
							rules={{
								required: 'You must choose an option'
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="Status" field={field} fieldState={fieldState}>
									<RadioGroup
										value={field.value}
										onChange={field.onChange}
										options={isActiveOptions}
										ref={null}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<div className="mt-2">
					<Button
						className="btn-primary me-2"
						onClick={handleSubmit(onSubmit)}
					>
						Save
					</Button>
					<Button
						className="btn-outline-primary"
						onClick={() => navigate('/pick-lists')}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Page>
	);

	function onSubmit(formData: PickListTypeRequest) {
		const newPickListType: PickListTypeRequest = { ...pickListType, code: formData.code, description: formData.description, isActive: formData.isActive };

		pickListAPI.savePickListType(newPickListType)
			.then(() => navigate('/pick-lists'));
	}

};

export default PickListTypeForm;