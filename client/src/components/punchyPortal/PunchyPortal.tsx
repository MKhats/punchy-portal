import React, { useEffect, useState } from 'react';
import { Button, Checkbox,  Input, Page, Select } from 'components/core';
import { IconAdd, IconBrand, IconChevronLeft, IconChevronRight, IconEdit, IconView } from 'assets/icons';
import PromptCard from './PromptCard';
import { Controller, useForm } from 'react-hook-form';
import PromptFilterList from './PromptFilterList';

const PunchyPortal = () => {
	const [isRightColumnVisible, setRightColumnVisible] =
		useState<boolean>(false);
	const toggleRightColumn = () => {
		setRightColumnVisible((prev) => !prev);
	};

	const { control } = useForm();


	const mockData = [
		{ id: 1, title: 'Testing One', image: <IconAdd /> },
		{ id: 2, title: 'Testing Two', image: <IconBrand /> },
		{ id: 3, title: 'Testing Three', image: <IconView /> },
		{ id: 4, title: 'Testing Four', image: <IconEdit /> },
	];

	const tempCategories = [
		{ value: 'Onboarding', label: 'Onboarding' },
		{ value: 'Style Guide', label: 'Style Guide' },
		{ value: 'Best Practices', label: 'Best Practices' },
		{ value: 'Design Language', label: 'Design Language' },

	];
	return (
		<Page title="Punchy Portal">
			<div className="container-fluid">
				<div className="row">
					{/* Left Column */}
					<div className="col-3 d-flex flex-column overflow-auto  bg-punchy-gray" style={{height: '100vh'}}>
						<h2 className="pt-4 ms-3">Prompts</h2>
						<Controller
							control={control}
							name="promptCategories"
							aria-labelledby="promptCategories"
							render={({ field }) =>
								<div className="mb-3">
									<Select
										value={field.value}
										onChange={field.onChange}
										options={tempCategories}
										className="ms-3"
										placeholder="Prompt category"
									/>
								</div>
							}
						/>
						<div className="w-100 py-3 pb-3 pt-2">
							<div className='mb-3'>
								<PromptFilterList/>
							</div>
							{mockData.map((data) =>
								<div key={`${data.id} - ${data.title}`} className="pb-4">
									<PromptCard key={data.id} title={data.title} image={data.image} />

								</div>
							)}
						</div>
					</div>

					{/* Center Column */}
					<div className={`col-6 d-flex align-items-end ${isRightColumnVisible ? '' : 'w-75'
					}`} >
						<div className="w-100 p-3">
							<Input placeholder="Type question here..." style={{ height: '55px' }} />
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
						<div className="d-flex flex-column p-4">
							<label htmlFor="voice-slider" className="me-2 pb-2">Configure voice</label>
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2">Value 1</label>
								<label htmlFor="voice-slider" className="ms-2">Value 2</label>
							</div>
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
