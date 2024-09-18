import React from 'react';
import classNames from 'classnames';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	type?: 'warning' | 'error' | 'info' | 'success' | 'danger';
}

export const ErrorMessage = (props: IProps) => {
	const { className, type, ...otherProps } = props;

	return (
		<div className={classNames('alert', type === undefined ? 'alert-danger' : `alert-${type}`, className)} {...otherProps} />
	);
};
