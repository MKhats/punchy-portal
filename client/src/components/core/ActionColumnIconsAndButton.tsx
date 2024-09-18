import React from 'react';
import { IconButton, Button } from 'components/core';
import { IconArrowRight, IconDelete, IconEdit, IconPerson } from 'assets/icons';

type actionButtonType = 'delete' | 'open' | 'edit' | 'manage-users';

interface IActionIconProps {
	title: string;
	onClick?: any;
	type: actionButtonType;
	disabled?: boolean;
}

export const ClearFilterButton = ({ onClick }: { onClick: any }) => (
	<Button className="btn btn-outline-primary" onClick={onClick}>Clear</Button>
);

export const ActionIcon = ({ title, onClick, type, disabled = false }: IActionIconProps) => {
	if (type === 'delete') {
		return (
			<IconButton
				className="pl-0 btn-link"
				title={title}
				onClick={onClick}
				disabled={disabled}
			>
				<IconDelete />
			</IconButton>
		);
	}
	if (type === 'open') {
		return (
			<IconButton
				className="btn-link"
				title={title}
				onClick={onClick}
				disabled={disabled}
			>
				<IconArrowRight />
			</IconButton>
		);
	}
	if (type === 'edit') {
		return (
			<IconButton
				className="btn-link"
				title={title}
				onClick={onClick}
				disabled={disabled}
			>
				<IconEdit />
			</IconButton>
		);
	}
	if (type === 'manage-users') {
		return (
			<IconButton
				className="btn-link"
				title={title}
				onClick={onClick}
				disabled={disabled}
			>
				<IconPerson />
			</IconButton>
		);
	}
};
