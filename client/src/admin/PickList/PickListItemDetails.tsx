import React from 'react';
import { Page, RadioGroup, Input, Button, Select, FormGroup, PageHero } from 'components/core';
import pickListAPI from 'api/pickListAPI';
import { PickListContext } from 'context/PickListContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

const PicklistItemDetails = () => {
	const PickListCxt = React.useContext(PickListContext);

	const [pickListTypeName, setPickListTypeName] = useState<string>('');
	const [pickListItem, setPickListItem] = useState<PickListItemRequest>();

	const { handleSubmit, control, setValue, reset } = useForm<PickListItemRequest>({
		defaultValues: {
			code: '',
			description: '',
			isActive: true,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const { pickListItemId, pickListTypeId } = useParams();
	const navigate = useNavigate();

	const isActiveOptions = [{ label: 'Active', value: true }, { label: 'Inactive', value: false }];

	useEffect(() => {
		if (pickListItemId !== '0') {
			pickListAPI.getPickListItem(pickListItemId)
				.then((resp: PickListItemRequest) => {
					const foundValue: PickListType = PickListCxt.pickListTypes.find((pType: PickListType) => pType.id === resp.pickListTypeId!)!;
					const parent = PickListCxt.pickListItems.find((pItem: PickListItem) => pItem.id === resp.parentId);
					if (foundValue) {
						setPickListTypeName(foundValue.description!);
						setValue('parentId', parent?.id ?? 0);
					}
					setPickListItem(resp);
					reset({
						code: resp.code,
						description: resp.description,
						isActive: resp.isActive,
					});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page title={`${pickListItemId === '0' ? 'Add' : 'Edit'} ${pickListTypeName.length > 0 ? pickListTypeName : 'picklist'} items`}>
			<PageHero
				title={`${pickListItemId === '0' ? 'Add' : 'Edit'} ${pickListTypeName.length > 0 ? pickListTypeName : 'picklist'} items`}
				parentRoute={`/pick-lists/${pickListTypeId}/pick-list-items`}
			/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<Controller
							control={control}
							name="code"
							rules={{ required: 'Enter a picklist item code' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Code" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="description"
							rules={{ required: 'Enter a picklist item description' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Description" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="isActive"
							render={({ field, fieldState }) =>
								<FormGroup label="Status" field={field} fieldState={fieldState}>
									<RadioGroup<boolean>
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
				<div className="row mb-3">
					{renderParentPickListItemDropdown()}
				</div>
				<Button
					className="btn-primary me-2"
					onClick={handleSubmit(formData => onSubmit(formData))}
				>
					Save
				</Button>
				<Button
					className="btn-outline-primary"
					to={`/pick-lists/${pickListTypeId}/pick-list-items`}
				>
					Cancel
				</Button>
			</div>
		</Page>
	);


	function renderParentPickListItemDropdown() {
		const parentPickListItems: PickListItemResponseDTO[] = [];
		if (parentPickListItems.length > 0) {
			const parentPickListOptions = parentPickListItems.map(parentPickListItem => ({ label: parentPickListItem.code, value: parentPickListItem.id }));

			return (
				<div className="col-md-3">
					<Controller
						control={control}
						name="parentId"
						render={({ field, fieldState }) =>
							<FormGroup label="Parent PickList Item" field={field} fieldState={fieldState}>
								<Select
									{...field}
									id="parentPickListItem"
									options={parentPickListOptions}
								/>
							</FormGroup>
						}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
	function onSubmit(formData: PickListItemRequest) {

		const newPickListItem = {
			...pickListItem,
			code: formData.code,
			description: formData.description,
			isActive: formData.isActive,
			pickListTypeId: Number(pickListTypeId),
			isDefault: false,
			id: pickListItem && pickListItem.id !== undefined ? pickListItem.id : undefined,
			parentId: formData.parentId,
		} as PickListItemRequest;

		pickListAPI.savePickListItem(newPickListItem)
			.then(() => navigate(`/pick-lists/${pickListTypeId}/pick-list-items`));

	}
};

export default PicklistItemDetails;
