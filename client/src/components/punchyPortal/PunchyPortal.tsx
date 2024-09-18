import React, { useEffect, useState } from 'react';
import { ActionIcon, Button, Checkbox, Page } from 'components/core';
import { useForm } from 'react-hook-form';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconChevronRight } from 'assets/icons';

const PunchyPortal = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<ProductDTO[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
		null
	);
	const [isRightColumnVisible, setRightColumnVisible] =
		useState<boolean>(false); // State for collapsible column

	const { reset } = useForm();

	useEffect(() => {
		const fetchProducts = async () => {
			const data = await tannerOnboardingAPI.products.getProducts();
			data !== null
				? setProducts(data)
				: toast.error('Error Fetching Products');
		};
		fetchProducts();
	}, []);

	const toggleRightColumn = () => {
		setRightColumnVisible((prev) => !prev);
	};

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
					<div className="col-6 d-flex align-items-center">
						<div className="w-100 p-3">
							<h5>Center Column</h5>
							<p>Content for the center column.</p>
						</div>
					</div>

					{/* Right Column */}
					<div
						className={`col-3 bg-punchy-gray ${isRightColumnVisible ? '' : 'd-none'
							}`}
					>
						<div className="w-100 p-3 d-flex align-items-baseline" style={{ position: 'relative', right: '32px', top: '15px' }}>
							<div className="d-flex align-items-baseline">
								<Button
									onClick={toggleRightColumn}
								>
									<IconChevronRight />
								</Button>
								<h5>Personality</h5>

							</div>
							<Checkbox isSwitch={true} className="ms-auto" style={{ position: 'relative', left: '21px' }} />
						</div>
					</div>
				</div>
				{/** Toggle Open */}
				<div
					className={`position-fixed ${isRightColumnVisible ? 'd-none' : ''}`}
					style={{ right: '10px', top: '31.5px' }}
				>
					<Button onClick={toggleRightColumn}>
						<IconChevronLeft />
					</Button>
				</div>
			</div>
		</Page>
	);
};

export default PunchyPortal;
