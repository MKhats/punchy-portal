import React, { useCallback, useEffect, useState } from 'react';
import {
	ActionIcon,
	Button,
	Checkbox,
	DataTable,
	FormGroup,
	Input,
	ModalOverlay,
	Page,
	PageHero,
	RadioGroup,
	Select,
	TextArea,
} from 'components/core';
import { Controller, useForm } from 'react-hook-form';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
	productTypes,
	validationStrings,
} from 'onboarding/data/tannerOnboardingModels';

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

const PunchyPortal = () => {
	const navigate = useNavigate();
	const [selectValue, setSelectValue] = useState<string>('');
	const [optionValue, setOptionValue] = useState<string>('');
	const [products, setProducts] = useState<ProductDTO[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
		null
	);

	const cancelProductEdit = useCallback(() => setSelectedProduct(null), []);

	const { handleSubmit, control, reset } = useForm<FormExample>({
		defaultValues: {
			readOnlyInput: 'This is readonly',
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange',
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
			value: 'third',
		},
		{
			label: 'simpleLabel',
			value: 'fourth',
		},
	];

	const customValidation = (value: string | undefined) => {
		return value?.toLocaleLowerCase().includes(validationStrings.Password)
			? 'field cannot contain password'
			: true;
	};

	const mapProductValues = (productList: ProductDTO[]) => {
		return productList.reduce((acc: selectInputValues[], data: ProductDTO) => {
			acc.push({ label: data.productName, value: data.productName });
			return acc;
		}, []);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			const data = await tannerOnboardingAPI.products.getProducts();
			data !== null
				? setProducts(data)
				: toast.error('Error Fetching Products');
		};
		fetchProducts();
	}, []);

	const deleteSelectedProduct = useCallback(async () => {
		if (selectedProduct) {
			const { id } = selectedProduct;
			const data = await tannerOnboardingAPI.products.deleteProduct(id!);
			if (data) {
				toast.success('Successfully Deleted Product');
				setProducts((product) => product.filter((x) => x.id != id));
			}
			setSelectedProduct(null);
		}
	}, [selectedProduct]);

	const navigateToTables = () => navigate('/tables/tablelist');

	const submitForm = (values: FormExample) => {
		JSON.stringify(values);
		console.log('values', values);
	};

	const resetForm = () => {
		const newDefaultValues = {
			...FORM_CLEAR_STATE,
			textInput: 'Re-initialized value',
		};
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
			show: true,
		},
		{
			Header: 'Product Name',
			accessor: 'productName',
		},
		{
			Header: 'Product Type',
			accessor: 'productType',
			id: 'filteredProductType',
			Filter: ({ filter, onChange }: { filter: any; onChange: Function }) => (
				<select
					onChange={(event) => onChange(event.target.value)}
					value={filter ? filter.value : 'all'}
				>
					<option value="all">Show All</option>
					<option value="accessories">Accessories</option>
					<option value="outerwear">Outerwear</option>
				</select>
			),
			filterMethod: (filter: any, rowData: any) => {
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
			},
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: any) => {
				const openDeleteModal = () => setSelectedProduct(rowInfo.original!);
				const openProduct = () => navigate(`/products/${rowInfo.original.id}`);
				return (
					<React.Fragment>
						<ActionIcon
							title="View Product"
							type="open"
							onClick={openProduct}
						/>
						<ActionIcon
							title="Delete Product"
							type="delete"
							onClick={openDeleteModal}
						/>
					</React.Fragment>
				);
			},
			Filter: <React.Fragment></React.Fragment>,
			Header: 'Actions',
			id: 'Actions',
		},
	];

	return (
		<Page title="Punchy Portal">
			<div className="container-fluid vh-100">
				<div className="row h-100">
					{/* Left Column */}
					<div className="col-3 d-flex align-items-center bg-punchy-gray">
						<div className="w-100 p-3">
							<h5>Left Column</h5>
							<p>Content for the left column.</p>
						</div>
					</div>

					{/* Center Column */}
					<div className="col-6 d-flex align-items-center bg-light">
						<div className="w-100 p-3">
							<h5>Center Column</h5>
							<p>Content for the center column.</p>
						</div>
					</div>

					{/* Right Column */}
					<div className="col-3 d-flex align-items-center bg-light">
						<div className="w-100 p-3">
							<h5>Right Column</h5>
							<p>Content for the right column.</p>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default PunchyPortal;
