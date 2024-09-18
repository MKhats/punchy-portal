import React from 'react';
import { DateTime } from 'luxon';
import { FormGroup, Input } from 'components/core';

export const FeedbackMetaDetails = (props: FeedbackDTO) => {
	const formateDate = (date: string | undefined) => date != undefined ? DateTime.fromISO(date).toLocaleString() : '-';

	return (
		<React.Fragment>
			<div className="row">
				<StaticInformation label="User Name" value={props.userName} />
				<StaticInformation label="User Email" value={props.userEmail} />
			</div>
			<div className="row">
				<StaticInformation label="Submitted Date" value={formateDate(props.submittedDate)} />
				<StaticInformation label="Completed Date" value={formateDate(props.completedDate)} />
				<StaticInformation label="Elevated Date" value={formateDate(props.elevatedDate)} />
			</div>
			<div className="row">
				<StaticInformation label="Deleted" value={props.deleted ? 'Deleted' : ''} />
				<StaticInformation label="Dismissed" value={props.dismissed ? 'Dismissed' : ''} />
			</div>
		</React.Fragment>
	);
};

export const MobileDetails = (props: FeedbackDTO) => {
	return (
		<React.Fragment>
			<div className="row">
				<StaticInformation label="Device OS" value={props.deviceOs} />
				<StaticInformation label="Device Version" value={props.deviceVersion} />
				<StaticInformation label="Device Language" value={props.deviceLanguage} />
				<StaticInformation label="App Version" value={props.appVersion} />
			</div>
			<div className="row mb-3">
				<StaticInformation label="Build Id" value={props.buildId} />
				<StaticInformation label="Battery Percentage" value={props.batteryPercentage} />
				<StaticInformation label="Low Power Mode" value={props.isLowPowerMode == true ? 'Yes' : 'No'} />
			</div>
			<label htmlFor="pagesVisited">Visited Pages</label>
			<p className="mb-3">
				{props.pagesVisited}
			</p>
			<label htmlFor="appPermissions">App Permissions</label>
			<p className="mb-3">
				{props.appPermissions?.replace(', ', '\n')}
			</p>
		</React.Fragment>
	);
};

export const BrowserDetails = (props: FeedbackDTO) => {
	return (
		<React.Fragment>
			<div className="row">
				<StaticInformation label="Browser" value={props.browser} />
				<StaticInformation label="Browser Version" value={props.browserVersion} />
			</div>
			<div className="row">
				<StaticInformation label="Computer OS" value={props.computerOs} />
				<StaticInformation label="Computer OS Version" value={props.computerOsVersion} />
				<StaticInformation label="Language" value={props.language} />
			</div>
		</React.Fragment>
	);
};

const StaticInformation = (props: { label: string, value: string | number | undefined }) => {
	return (
		<div className="col-lg-3">
			<FormGroup label={props.label}>
				<Input id={props.label} value={props.value} disabled={true} />
			</FormGroup>
		</div>
	);
};