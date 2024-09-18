import React from 'react';
import { DateTime } from 'luxon';

interface IProps {
	feedback?: FeedbackDTO;
}

const FeedbackDetailsPanel = (props: IProps) => {

	const formateDate = (date: string | undefined) => date != undefined ? DateTime.fromISO(date).toLocaleString() : '-';

	return (
		<div className="bg-gray-200 border rounded p-4">
			<h3 className="mb-4">User Details</h3>
			<h5 className="mb-3">User Information</h5>
			<p className="mb-1">User Name</p>
			<p className="mb-3 fw-bold">{props.feedback?.userName}</p>
			<p className="mb-1">Date Submitted</p>
			<p className="mb-3 fw-bold">{formateDate(props.feedback?.submittedDate)}</p>
			<p className="mb-1">User Email</p>
			<p className="mb-4 fw-bold">{props.feedback?.userEmail}</p>
			<h5 className="mb-3">Device Information</h5>
			{props.feedback?.browser != null &&
				<React.Fragment>
					<p className="mb-1">Computer OS Version</p>
					<p className="mb-3 fw-bold">{props.feedback?.computerOsVersion}</p>
					<p className="mb-1">Computer OS</p>
					<p className="mb-3 fw-bold">{props.feedback?.computerOs}</p>
					<p className="mb-1">Browser</p>
					<p className="mb-3 fw-bold">{props.feedback?.browser}</p>
					<p className="mb-1">Browser Version</p>
					<p className="mb-3 fw-bold">{props.feedback?.browserVersion}</p>
					<p className="mb-1">Language</p>
					<p className="mb-0 fw-bold">{props.feedback?.language}</p>
				</React.Fragment>
			}
			{props.feedback?.deviceOs != null &&
				<React.Fragment>
					<p className="mb-1">Device OS</p>
					<p className="mb-3 fw-bold">{props.feedback?.deviceOs}</p>
					<p className="mb-1">Device OS Version</p>
					<p className="mb-3 fw-bold">{props.feedback?.deviceVersion}</p>
					<p className="mb-1">Device Language</p>
					<p className="mb-3 fw-bold">{props.feedback?.deviceLanguage}</p>
					<p className="mb-1">App Version</p>
					<p className="mb-3 fw-bold">{props.feedback?.appVersion}</p>
					<p className="mb-1">Build Id</p>
					<p className="mb-3 fw-bold">{props.feedback?.buildId}</p>
					<p className="mb-1">Battery Percentage</p>
					<p className="mb-3 fw-bold">{props.feedback?.batteryPercentage}</p>
					<p className="mb-1">Low Power Mode?</p>
					<p className="mb-3 fw-bold">{props.feedback?.isLowPowerMode == true ? 'Yes' : 'No'}</p>
					<p className="mb-1">Visited Pages</p>
					<p className="mb-3 fw-bold">{props.feedback?.pagesVisited}</p>
					<p className="mb-1">App Permissions</p>
					<p className="mb-0 fw-bold">{props.feedback?.appPermissions?.replace(', ', '\n')}</p>
				</React.Fragment>
			}
		</div>
	);
};

export default FeedbackDetailsPanel;

