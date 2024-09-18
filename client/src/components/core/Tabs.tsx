import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Utils } from 'utils';

interface ITab {
	id: number;
	to: string;
	label: string;
}

interface IProps {
	tabs: ITab[];
	className?: string;
}

const Tabs = (props: IProps) => {
	let location = useLocation();

	React.useEffect(() => {
		Utils.setDocTitle(getTabTitle(location, props.tabs));
	}, [location, props.tabs]);

	return (
		<div className={classNames('border-top border-bottom tab-wrapper', props.className)}>
			{props.tabs.map((tab) => (
				<NavLink className="btn tab" to={tab.to} key={tab.id || tab.to}>
					{tab.label}
				</NavLink>
			))}
		</div>
	);
};

function getTabTitle(location: any, tabs: any[]) {
	let title = '';

	const currentTab = tabs.find((tab: any) => {
		return location && (tab.to === location.pathname);
	});

	if (currentTab) {
		title = currentTab.label;
	}
	return title;
}

export default Tabs;