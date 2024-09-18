import React from 'react';
import { IconButton } from 'components/core';
import { IconChevronLeft, IconChevronRight } from 'assets/icons';

interface IProps {
	totalItems?: number;
	pageSize: number;
	currentPage: number;
	onPageChange: (pageIndex: number) => void;
	onPageSizeChange: (pageSize: number) => void;
}

const TablePagination = (props: IProps) => {
	const { totalItems, pageSize, currentPage, onPageChange, onPageSizeChange } = props;
	const pageCount = Math.ceil((totalItems ?? 0) / pageSize);
	const pageNumbers = Array.from(Array(pageCount).keys()).map((i) => i + 1);

	const handlePageChange = (pageIndex: number) => {
		onPageChange(pageIndex);
	};

	const handleNextPage = () => {
		if (currentPage < pageCount - 1) {
			const nextPageIndex = currentPage + 1;
			onPageChange(nextPageIndex);
		}
	};
	const handlePageSizeChange = (pageSize: number) => {
		onPageSizeChange(pageSize);
	};

	const handlePreviousPage = () => {
		if (currentPage > 0) {
			const newPageIndex = currentPage - 1;
			onPageChange(newPageIndex);
		}
	};

	return (
		<div className="pagination">
			<div className="items-per-page d-flex align-items-center me-3">
				<label htmlFor="items-per-page-select">Items per page:</label>
				<select
					id="items-per-page-select"
					className="py-2 px-2 ms-2 border rounded fw-bold"
					value={pageSize}
					onChange={(event) => handlePageSizeChange(Number(event.target.value))}
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>
			</div>
			<div className="border d-flex rounded">
				<IconButton className="border-0 p-0" onClick={handlePreviousPage} disabled={currentPage === 0}>
					<IconChevronLeft />
				</IconButton>
				{pageNumbers.map((pageNumber, index) => (
					<button
						key={pageNumber}
						className={`page-number px-3 py-2 fw-bold ${pageNumber === currentPage + 1 ? 'active' : ''} 
						${index === pageNumbers.length - 1 ? 'border-end' : ''}`}
						onClick={() => handlePageChange(pageNumber - 1)}
					>
						{pageNumber}
					</button>
				))}
				<IconButton className="border-0 p-0" onClick={handleNextPage} disabled={currentPage === pageCount - 1}>
					<IconChevronRight />
				</IconButton>
			</div>
		</div>
	);
};

export default TablePagination;
