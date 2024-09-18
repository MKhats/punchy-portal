import { Page, PageHero } from 'components/core';
import React from 'react';

const TableList = () => {
	return (
		<Page title="Table List">
			<PageHero
				className="d-flex"
				title="Table List Page"
			/>
			<section className="container-fluid">
				Goals for Table page
				<ul>
					<li>Database Goals
						<ul>
							<li>Create a new table in database using Entity Frameworks</li>
							<li>Update existing table with new column</li>
							<li>Create migrations and apply migration to database</li>
						</ul>
					</li>
					<li>React Forms
						<ul>
							<li>Create a form page using React Hook Forms (useForm)</li>
							<li>Create text fields in React form using &lt;Controller /&gt;</li>
							<li>Create &lt;select&gt; drop down with data pulled from database api</li>
							<li>Create &lt;checkbox&gt; control</li>
							<li>Create &lt;toggle control&gt;</li>
							<li>Validation errors for required fields</li>
						</ul>
					</li>
					<li>Data Tables
						<ul>
							<li>Create data table with data from database api</li>
							<li>Add Filters and Sort Order controls to header of each column</li>
							<li>Add Edit button for each row </li>
							<li>Add Delete button for each row</li>
							<li>Add pagination to data tables</li>
						</ul>
					</li>
				</ul>
			</section>
			<section className="container-fluid">
				<p>Identify Tables for the Bidders at the event</p>
				<ul>
					<li>Create database table called <b>Tables</b>, with fields:
						<ul>
							<li>Table Number</li>
							<li>Table Name / nickname</li>
							<li>Capacity</li>
							<li>Server Name</li>
							<li>Allow Alcohol</li>
						</ul>
					</li>
					<li>Change <em>TableNumber</em> field in Bidders to <em>TableId</em></li>
					<li>Create a page with list of tables with columns:
						<ul>
							<li>Table Number</li>
							<li>Table Name</li>
							<li>Server Name</li>
							<li>Alcohol Allowed</li>
							<li># of Bidders Assigned / Capacity </li>
							<li>Edit button / delete button</li>
						</ul>
					</li>
					<li>User can add, edit or delete Tables
						<ul>
							<li>
								<em>A warning is displayed if trying to delete a table with assigned Bidders</em>
							</li>
						</ul>
					</li>
					<li>User can download a csv file with a list of all tables and associated bidders</li>
					<li>Create a page to edit values for a Table</li>
					<li>Edit table page includes:
						<ul>
							<li>Can edit fields for a table</li>
							<li>Page includes a ist of Bidders associated with that table and the ability to add or remove Bidders from the list</li>
							<li>Include a warning if the table is at capacity</li>
							<li>Users can upload photos taken of the people at the table during the event</li>
						</ul>
					</li>
					<li>Update Bidders Page
						<ul>
							<li>Add select list to Bidders page to select the table they are assigned.</li>
							<li>Prevent Bidders from being added to a table that is already at capacity</li>
						</ul>
					</li>
				</ul>
			</section>
		</Page>
	);
};

export default TableList;