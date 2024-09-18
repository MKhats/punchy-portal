import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Button, Page, PageHero } from 'components/core';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Label from 'components/onboarding/Label';
import ErrorMessage from 'components/onboarding/ErrorMessage';
import { Input } from 'components/core/Input';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';

const Product: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState<boolean>(true);
	const { handleSubmit, control, reset, formState: { errors } } = useForm<ProductDTO>({
		defaultValues: {
			id: 0,
			tannerId: 0,
			productName: '',
			productType: '',
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});
	const submitData = useCallback(async (data: ProductDTO) => {
		const product = await tannerOnboardingAPI.products.updateProduct(data);
		if (product) {
			toast.success('Product Successfully Saved');
			navigate('/tannerOnboarding');
		} else {
			toast.error('Unable to Save Product');
		}
	},[]);

	useEffect(() => {
		async function getProduct(productId: number) {
			const product = await tannerOnboardingAPI.products.getProduct(productId);
			if (product){
				reset(product);
			} else {
				toast.error(`Unable to get Product Information`);
			}
			setLoading(false);
		}
		getProduct(Number(params.productId));
	},[]);


	if (loading) {
		return null;
	}
	return (
		<Page title="Product">
			<PageHero
				className="d-flex"
				title="Product Details"
			/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<Controller
							control={control}
							name="productName"
							rules={
								{
									required: 'Product Name is required',
								}
							}
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name} required={true}>Product Name</Label>
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
							name="productType"
							rules={
								{
									required: 'Product Type is required',
								}
							}
							aria-labelledby=""
							render={({ field, fieldState: { error } }) => (
								<div className="mb-3">
									<Label htmlFor={field.name}>Product Type</Label>
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
				<div className="d-flex gap-3">
					<Button
						className="btn-primary"
						onClick={handleSubmit(submitData)}
					>
					Submit
					</Button>

					<Button
						className="btn-info"
						onClick={() => {
							navigate('/tannerOnboarding');
						}}
					>
					Cancel
					</Button>

				</div>
			</div>
		</Page>
	);
};

export default Product;
