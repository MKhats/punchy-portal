import React from 'react';
import classNames from 'classnames';
import { ControllerFieldState } from 'react-hook-form';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	fieldState?: ControllerFieldState;
	type?: 'warning' | 'error' | 'info' | 'success' | 'danger';
}

export const ErrorMessage = (props: IProps) => {
	const { fieldState, className, type, ...otherProps } = props;
	if (fieldState?.error?.message === undefined) {
		return <React.Fragment />;
	}
	return (
		<div className={classNames('alert', type === undefined ? 'alert-danger' : `alert-${type}`, className)} {...otherProps}>
			{fieldState?.error?.message}
		</div>
	);
};
