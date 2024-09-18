import React from 'react';

type FilterField = 'status' | 'isActive';

const statusFilters = ['All', 'Active', 'Inactive'];

export const filterByStatus = (filterField: FilterField) => (filter: any, row: any) => {
	if (filter.value === 'All') {
		return true;
	}
	if (filter.value === 'Active' && row[filterField] === true) {
		return true;
	}
	if (filter.value === 'Inactive' && row[filterField] === false) {
		return true;
	}
	return false;
};

export const setStatusCellValue = (row: any) => {
	return row.value === true ? 'Active' : 'Inactive';
};

export const StatusFilterMethod = ({ filter, onChange }: { filter: any, onChange: any }) => {
	return (
		<select
			value={filter ? filter.value : 'All'}
			onChange={e => onChange(e.target.value)}
			className="form-control"
		>
			{statusFilters.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};