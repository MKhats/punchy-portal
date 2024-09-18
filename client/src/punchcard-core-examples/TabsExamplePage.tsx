import React from 'react';
import { Page, Tabs } from 'components/core';

const tabsList = [
	{
		id: 1, to: '/punchcardcore/tabs-controls', label: 'Tab'
	},
	{
		id: 2, to: '/punchcardcore/form-controls', label: 'Hover Tab'
	},
	{
		id: 3, to: '/punchcardcore/picklist-controls', label: 'Active Tab'
	},
	{
		id: 4, to: '/punchcardcore/tabs-controls', label: 'Disabled Tab'
	},
];

const TabsExamplePage = () => {
	return(
		<Page title="Form Control Example">
			<div className="workflow-progress-wrapper">
				<div className="container">
					<h1 className="h2 m-0">Tabs Examples</h1>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<legend>Desktop Tabs</legend>
						<Tabs
							tabs={tabsList}
						/>
					</div>
				</div>
			</div>
			<div className="navbar navbar-expand-lg">
				<div className="row">
					<div className="col-12">
						<legend>Mobile Tabs</legend>
						<Tabs
							tabs={tabsList}
						/>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default TabsExamplePage;