import React from 'react';
import classNames from 'classnames';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { IconChevronLeft, IconChevronRight } from 'assets/icons';
import { Spinner, IconButton } from 'components/core';
import TablePagination from './TablePagination';

interface IProps {
	className?: string;
	filterable?: boolean;
	TableComponent?: any;
	columns?: any[];
	data?: any[];
	getTableProps?: (...args: any[]) => {};
	getTheadFilterThProps?: (...args: any[]) => {};
	getTheadGroupProps?: (...args: any[]) => {};
	getTheadProps?: (...args: any[]) => {};
	getTheadThProps?: (...args: any[]) => {};
	getTbodyProps?: (...args: any[]) => {};
	getTrProps?: (...args: any[]) => {};
	getTdProps?: (...args: any[]) => {};
	minRows?: number;
	hasActions?: boolean;
	resizable?: boolean;
	sortable?: boolean;
	filtered?: any[];
	defaultFiltered?: any;
	onFilteredChange?: any;
	noDataText?: string;
	showPagination?: boolean;
	onPageChange?: (pageIndex: number) => void;
	page?: number;
	// handles clicks on each data table row, if not provided nothing happens
	onRowClick?: ({ row, original }: { row?: any, original?: any }) => void;
	loading?: boolean;
	pageSize?: number;
	}

const DataTable = (props: IProps) => {
	const onNavigate = (e: any, callback: () => void) => {
		// TODO: Find a better way to animate the page
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
		callback();
	};

	const getTrProps = (_: any, rowInfo: any) => {
		const { onRowClick } = props;
		if (onRowClick) {
			return {
				className: 'tr cursor-pointer',
				onClick(e: any, handleOriginal: any) {
					onRowClick(rowInfo);
					if (handleOriginal) {
						handleOriginal();
					}
				}
			};
		} else {
			return {
				className: 'tr p-0'
			};
		}
	};

	const {
		className,
		filterable,
		hasActions,
		TableComponent,
		columns,
		data,
		showPagination = true,

		getTableProps = () => {
			return { className: 'table' };
		},
		getTheadFilterThProps = () => {
			return { className: 'th' };
		},
		getTheadGroupProps = () => {
			return { className: 'thead theadgroup' };
		},
		getTheadProps = () => {
			return { className: 'thead border-gray border-bottom bg-light' };
		},
		getTheadThProps = () => {
			return { className: 'td px-3 py-2 my-1 d-flex align-items-center' };
		},
		getTbodyProps = () => {
			return { className: 'tbody' };
		},
		getTdProps = () => {
			return { className: 'td px-3 py-2 my-1 d-flex align-items-center' };
		},
		minRows = 0,
		resizable = false,
		sortable = true,
		noDataText,
		filtered,
		defaultFiltered,
		onFilteredChange,
		onPageChange,
		page,
		loading,
		pageSize = 10,
	} = props;


	return (
		<ReactTable
			className={classNames('data-table', hasActions !== false && 'has-actions', className)}
			filterable={filterable}
			onFilteredChange={onFilteredChange}
			filtered={filtered}
			defaultFilterMethod={(filter: { id: string | number; value: any; }, row: { [x: string]: any; }) => {
				return String(row[filter.id]).toLowerCase().includes(String(filter.value).toLowerCase());
			}}
			defaultFiltered={defaultFiltered}
			TableComponent={TableComponent}
			columns={columns}
			defaultPageSize={pageSize}
			data={data}
			showPagination={showPagination}
			PaginationComponent={({ page, onPageChange, onPageSizeChange, pageSize }) => (
				<TablePagination
					totalItems={data?.length}
					pageSize={pageSize}
					currentPage={page}
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
				/>
			)}
			getTableProps={getTableProps}
			getTheadFilterThProps={getTheadFilterThProps}
			getTheadGroupProps={getTheadGroupProps}
			getTheadProps={getTheadProps}
			getTheadThProps={getTheadThProps}
			getTbodyProps={getTbodyProps}
			getTrProps={getTrProps}
			getTdProps={getTdProps}
			minRows={minRows}
			resizable={resizable}
			loading={loading}
			LoadingComponent={() => loading ? <Spinner className="spinner-large" /> : null}
			sortable={sortable}
			PreviousComponent={(p: { onClick: () => void; disabled: boolean | undefined; }) => (
				<IconButton
					onClick={(e: any) => onNavigate(e, p.onClick)}
					disabled={p.disabled}
					className="btn-link"
				>
					<IconChevronLeft />
				</IconButton>
			)}
			NextComponent={(p: { onClick: () => void; disabled: boolean | undefined; }) => (
				<IconButton
					onClick={(e: any) => onNavigate(e, p.onClick)}
					disabled={p.disabled}
					className="btn-link"
				>
					<IconChevronRight />
				</IconButton>
			)}
			onPageChange={onPageChange}
			noDataText={!loading && noDataText}
			page={page}
		/>
	);
};

export default DataTable;