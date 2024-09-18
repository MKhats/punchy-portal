import React from 'react';
import { DataTable, Page, PageHero } from 'components/core';
import dataTableExampleAPI from './dataTableExampleAPI';


const DataTableExample = () => {
	const [movieData, setMovieData] = React.useState<DataTableExampleMovieDTO[]>(new Array<DataTableExampleMovieDTO>());

	React.useEffect(() => {
		dataTableExampleAPI.getMovieData()
			.then((data) => setMovieData(data));
	}, []);

	// This is defined here so that the columns array isn't recreated every time the render function is called.
	const columns = [
		{
			Header: 'Movie ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Movie Name',
			accessor: 'movieName'
		},
		{
			Header: 'Genre',
			accessor: 'genre'
		},
		{
			Header: 'Year',
			accessor: 'yearReleased'
		},
		{
			Header: 'Director',
			accessor: 'directorName'
		},
		{
			accessor: 'yearReleased',
			// If you need to do this, make sure that the work being done is as lightweight as possible
			Cell: (rowInfo: any) => (+rowInfo.row.yearReleased < 1990 ? 'Yes' : 'No'),
			Filter: (items: { filter: any, onChange: any }) =>
				(
					<select
						onChange={event => items.onChange(event.target.value)}
						value={items.filter ? items.filter.value : 'all'}
					>
						<option value="all">Show All</option>
						<option value="older">Older Only</option>
						<option value="newer">Newer Only</option>
					</select>
				),
			filterMethod: (filter: any, rowData: any) => {
				// the filter argument is an object specifying the following:
				// id: the filter column's id
				// value: the value that has been typed into the filter field (in this case the value of the selected option in the dropdown)
				// rowData is the row or rows of data supplied to the table
				if (filter.value === 'all') {
					return true;
				}
				if (filter.value === 'older') {
					return +rowData[filter.id] < 1990;
				}
				return +rowData[filter.id] >= 1990;
			},
			Header: 'Is Older Movie',
			id: 'isClassic'
		}
	];

	return (
		<Page title="Data Table Example">
			<PageHero title="Data Table Example" />
			<section className="container-fluid">
				<h2>DataTable</h2>
				<p>This control is found in the components/common/DataTable.tsx file. Currently,
						this control is a wrapper around <a href="https://react-table.js.org/#/story/readme" target="_blank" rel="noopener noreferrer">React Table</a>.
						Full API and samples can be found on the React Table website.
				</p>
				<h3>Basic API</h3>
				<dl>
					<dt>columns: any[]</dt>
					<dd>Specifies an array of columns to bind data to. At a bare minimum, you must specify the following properties:
						<ul>
							<li>Header: string = Specifies the text to display at the top of the column. (Note the capitalization of this property)</li>
							<li>accesor: string = Specifies the property to bind to on the underlying data array that will be the data source for the grid.</li>
						</ul>
						<p>
								There are many other properties available that can be set for each individual column, but they are beyond the scope of this page.
								For more information on the full API, please see
								the <a href="https://react-table.js.org/#/story/readme" target="_blank" rel="noopener noreferrer">React Table documentation</a>.
						</p>
					</dd>
					<dt>data: any[]</dt>
					<dd>Specifies an array of Javascript objects that will serve as the data source for the data table.</dd>
					<dt>filterable?: boolean</dt>
					<dd>Specifies a value indicating whether the data table should provide filtering capabilities.</dd>
					<dt>resizable?: boolean</dt>
					<dd>Specifies a value indicating whether the columns in the grid should be resizable. (This can also be set at the individual column level)</dd>
					<dt>noDataText: string</dt>
					<dd>Specifies a message to display when there is no data to display based upon either no data being available to bind to
							or if a column level filter has been applied that does not apply to any of the data in that column.
							(For example: Type <strong>Bob</strong> into the Director column below)
					</dd>
				</dl>

				<DataTable
					data={movieData}
					columns={columns}
					filterable={true}
					resizable={true}
					noDataText="No movies found."
				/>
			</section>
		</Page>
	);
};

export default DataTableExample;