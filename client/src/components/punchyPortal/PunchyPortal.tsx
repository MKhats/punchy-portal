import React, { useEffect, useState } from 'react';
import { Button, Checkbox,  Input, Page, Select } from 'components/core';
import { IconAdd, IconBrand, IconChevronLeft, IconChevronRight, IconEdit, IconView } from 'assets/icons';
import PromptCard from './PromptCard';
import { Controller, useForm } from 'react-hook-form';
import PromptFilterList from './PromptFilterList';
import { min } from 'lodash';

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
					<div className="col-3 d-flex flex-column overflow-auto bg-punchy-tan" style={{height: '100vh'}}>
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
							<div className="mb-3 ps-3">
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
					<div className={`bg-punchy-yellow col-6 d-flex align-items-end ${isRightColumnVisible ? '' : 'w-75'
					}`} >
						<div className="w-100 p-3">
							<Input placeholder="Type your message here..." style={{ height: '55px'}} className="bg-punchy-mustard" />
						</div>
					</div>

					{/* Right Column */}
					<div
						className={`col-3 bg-punchy-tan overflow-auto ${isRightColumnVisible ? '' : 'd-none'
						}`}
						style={{height: '100vh'}}
					>
						<Button
							onClick={toggleRightColumn}
							style={{position:'relative', right: '10px'}}
						>
							<IconChevronRight />
						</Button>
						<div className="d-flex align-items-baseline ms-4">
							<h2> Prompt Personality</h2>
						</div>
						<div className="w-100 p-3 d-flex align-items-baseline" style={{position: 'relative', right: '95px'}} >
							<Checkbox isSwitch={true} className="ms-auto" /> <span>Recommended values</span>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Assertive</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Passive</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Simple</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Complex</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Formal</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Informal</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Analytical</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Creative</label>
							</div>
						</div>
						<div className="d-flex flex-column p-4">
							<input type="range" className="mb-2 w-100" id="voice-slider" defaultValue="0" />
							<div className="d-flex justify-content-between w-100">
								<label htmlFor="voice-slider" className="me-2 text-uppercase">Nonchalant</label>
								<label htmlFor="voice-slider" className="ms-2 text-uppercase">Enthusiastic</label>
							</div>
						</div>


					</div>
				</div>
				{/** Toggle Open */}
				<div
					className={`position-fixed ${isRightColumnVisible ? 'd-none' : ''}`}
					style={{ right: '10px', top: '5px' }}
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
