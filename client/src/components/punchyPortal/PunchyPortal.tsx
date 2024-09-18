import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, Page } from 'components/core';
import { IconChevronLeft, IconChevronRight } from 'assets/icons';

const PunchyPortal = () => {
	const [isRightColumnVisible, setRightColumnVisible] =
		useState<boolean>(false);
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
					<div className="col-6 d-flex align-items-end pb-4">
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
