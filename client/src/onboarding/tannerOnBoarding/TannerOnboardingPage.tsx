import React, { useCallback, useEffect, useState } from 'react';
import { ActionIcon, Button, Checkbox, DataTable, FormGroup, Input, ModalOverlay, Page, PageHero, RadioGroup, Select, TextArea } from 'components/core';
import { Controller, useForm } from 'react-hook-form';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validationStrings, productTypes } from '../data/tannerOnboardingModels';

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

interface selectInputValues {
	label: string;
	value: string;
}

interface FormExample {
	textInput: string;
	requiredInput: string;
	disabledInput: string;
	readOnlyInput: string;
	addOnInput: string;
	numberInput: number;
	emailInput: string;
	textAreaInput: string;
	select: selectInputValues;
	checkboxGroup: string[];
	checkbox: string;
	radioGroup: string;
}

const TannerOnboardingPage = () => {
	const navigate = useNavigate();
	const [selectValue, setSelectValue] = useState<string>('');
	const [optionValue, setOptionValue] = useState<string>('');
	const [products, setProducts] = useState<ProductDTO[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);


	const cancelProductEdit = useCallback(() => setSelectedProduct(null), []);

	const { handleSubmit, control, reset } = useForm<FormExample>({
		defaultValues: {
			readOnlyInput: 'This is readonly'
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});


	const productList = [
		{ value: 't-shirt', label: 'T-Shirt' },
		{ value: 'sweater', label: 'Sweater' },
		{ value: 'jeans', label: 'Jeans' },
		{ value: 'jacket', label: 'Jacket' },
	];

	const toggleOptions = [
		{ label: 'firstOption', value: 'first' },
		{ label: 'second option with spacing', value: 'second' },
		{
			label:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, quis!',
			value: 'third'
		},
		{
			label: 'simpleLabel',
			value: 'fourth'
		}
	];

	const customValidation = (value: string | undefined) => {
		return value?.toLocaleLowerCase().includes(validationStrings.Password) ? 'field cannot contain password' : true;
	};

	const mapProductValues = (productList:ProductDTO[]) => {
		return productList.reduce((acc:selectInputValues[], data:ProductDTO) => {
			acc.push({ label: data.productName, value: data.productName });
			return acc;
		  }, []);
	};

	useEffect(() =>{
		const fetchProducts = async () => {
			const data = await tannerOnboardingAPI.products.getProducts();
			data !== null ? setProducts((data)) : toast.error('Error Fetching Products');
		};
		fetchProducts();
	}, []);

	const deleteSelectedProduct = useCallback(async () => {
		if(selectedProduct) {
			const { id } = selectedProduct;
			const data = await tannerOnboardingAPI.products.deleteProduct(id!);
			if(data) {
				toast.success('Successfully Deleted Product');
				setProducts(product => product.filter(x => x.id != id));
			}
			setSelectedProduct(null);
		}
	},[selectedProduct]);

	const navigateToTables = () => navigate('/tables/tablelist');

	const submitForm = (values: FormExample) => {
		JSON.stringify(values);
		console.log('values', values);
	};

	const resetForm = () => {
		const newDefaultValues = { ...FORM_CLEAR_STATE, textInput: 'Re-initialized value' };
		/***
			 * NOTE: FORM_CLEAR_STATE is required here to reset reset/clear your form components state,
			 * because only fields that are set as NOT undefined trigger a rerender in their Controller
			 * so `const newDefaultValues = { textInput: 'Re-initialized value' };` will not work
			 */
		reset(newDefaultValues); // clear and reinitialize form with new default values
	};


	const columns = [
		{
			Header: 'Product ID',
			accessor: 'id',
		},
		{
			Header: 'Tanner ID',
			accessor: 'tannerId',
			show: true
		},
		{
			Header: 'Product Name',
			accessor: 'productName',
		},
		{
			Header: 'Product Type',
			accessor: 'productType',
			id: 'filteredProductType',
			Filter: ({ filter, onChange }: { filter: any, onChange: Function }) => (
				<select
					onChange={event => onChange(event.target.value)}
					value={filter ? filter.value : 'all'}
				>
					<option value="all">Show All</option>
					<option value="accessories">Accessories</option>
					<option value="outerwear">Outerwear</option>
				</select>
			),
			filterMethod: (filter:any, rowData:any) => {
				// the filter argument is an object specifying the following:
				// id: the filter column's id
				// value: the value that has been typed into the filter field (in this case the value of the selected option in the dropdown)
				// rowData is the row or rows of data supplied to the table
				const { value } = filter;
				switch (value) {
				case 'all':
					return rowData;
				case 'accessories':
					return rowData.filteredProductType === productTypes.Accessories;
				case 'outerwear':
					return rowData.filteredProductType === productTypes.Outerwear;
				default:
					return true;
				}
			}
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const openDeleteModal = () => setSelectedProduct(rowInfo.original!);
				const openProduct = () => navigate(`/products/${rowInfo.original.id}`);
				return (
					<React.Fragment>
						<ActionIcon title="View Product" type="open" onClick={openProduct} />
						<ActionIcon title="Delete Product" type="delete" onClick={openDeleteModal} />
					</React.Fragment>
				);
			},
			Filter: <React.Fragment></React.Fragment>,
			Header: 'Actions',
			id: 'Actions'
		},
	];

	return (
		<Page title="Tanner Onboarding Page">
			<PageHero className="text-center" title="Interacting with Local DB & Creating Custom Components using Punchcard Core" />
			<div className="d-flex align-items-center justify-content-center">
				<Button
					className="btn-info"
					onClick={navigateToTables}
				>
					View Bidder Tables
				</Button>

			</div>
			<div className="container">
				<h2 className="pc-bordered-title">Working with Forms</h2>
				<div className="row">
					<div className="col">
						<Controller
							control={control}
							rules={{ validate: val => customValidation(val)}}
							name="textInput"
							render={({ field, fieldState }) =>
								<FormGroup label="Text Input with Custom Validation Method" field={field} fieldState={fieldState}>
									<Input
										value={field.value ?? ''}
										name={field.name}
										onChange={field.onChange}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col">
						<label className="form-label">Select Input with Custom OnChange Hook</label>
						<Controller
							control={control}
							name="select"
							render={({ field }) =>
								<Select
									id="select"
									name={field.name}
									value={field.value}
									options={productList}
									onChange={(value) => {
										setSelectValue(String(value));
								  	}}
									placeholder={selectValue}
								/>
							}
						/>
					</div>
					<div className="w-100"></div>
					<div className="col">
						<label className="form-label">Form Group with Multiple Control Inputs</label>
						<Controller
							control={control}
							name="readOnlyInput"
							render={({field, fieldState}) =>
								<FormGroup label="Read only field" field={field} fieldState={fieldState}>
									<Input
										readOnly={true}
										{...field}
									/>
								</FormGroup>
							}
						/>
						<Controller
							control={control}
							name="numberInput"
							render={({ field }) =>
								<FormGroup label="Number Input" field={field} >
									<Input
										type="number"
										className="form-control"
										id="numberinput"
										name={field.name}
										value={field.value}
										onChange={field.onChange}
										placeholder="Restricted to Numbers Only"
									/>
								</FormGroup>
							}
						/>
						<Controller
							control={control}
							name="disabledInput"
							render={({ field, fieldState }) =>
								<FormGroup label="Disabled Input" field={field} fieldState={fieldState} >
									<Input
										disabled={true}
										placeholder="Disabled Input"
										{...field}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col">
						<label className="form-label">Text Area Input</label>
						<Controller
							control={control}
							name="textAreaInput"
							render={({ field }) =>
								<TextArea
									id="textAreaInput"
									name={field.name}
									value={field.value}
								  	onChange={field.onChange}
									placeholder="Text Area with 1 Row"
									rows={1}
								/>
							}
						/>
					</div>
					<div className="col">
						<label className="form-label">Toggle Switch</label>
						<Controller
							control={control}
							name="checkbox"
							render={({ field }) =>
								<Checkbox
									id="toggleSwitch"
									name={field.name}
									value={field.value}
									onChange={field.onChange}
									isSwitch={true}
									className="d-block"
								/>
							}
						/>
					</div>
					<div className="col">
						<label className="form-label">Radio Group</label>
						<Controller
							control={control}
							name="radioGroup"
							rules={{
								required: 'Select at least one option before continuning'
							}}
							render={({ field }) =>
								<RadioGroup
									name={field.name}
									value={optionValue}
									options={toggleOptions}
									onChange={(value) => {
										setOptionValue(value);
									}}
								/>
							}
						/>
					</div>
					<div className="col">
						Selected Option: {optionValue}
					</div>
					<div className="col">
						<label className="form-label">Select Input with Data from API</label>
						<Controller
							control={control}
							name="select"
							render={({ field }) =>
								<Select
									id="selectUsingAPI"
									name={field.name}
									value={field.value}
									options={mapProductValues(products)}
									onChange={field.onChange}
									placeholder="Select a Product"
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
			</div>
			<div className="container-fluid">
				<DataTable
					data={products}
					columns={columns}
					filterable={true}
					resizable={true}
					noDataText="No Products Found."
				/>
			</div>
			<ModalOverlay
				isOpen={selectedProduct !== null}
				modalSize="md"
				onRequestClose={cancelProductEdit}
				headerChildren="Delete Product?"
				confirmButtonChildren="Delete"
				cancelButtonChildren="Cancel"
				cancelButtonAction={cancelProductEdit}
				confirmButtonAction={deleteSelectedProduct}
			>
				This cannot be undone
			</ModalOverlay>
		</Page>
	);

};

export default TannerOnboardingPage;
