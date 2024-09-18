import React, { HTMLAttributeAnchorTarget } from 'react';
import classNames from 'classnames';
import { Link, To } from 'react-router-dom';
import { Spinner } from 'components/core';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	to?: To;
	target?: HTMLAttributeAnchorTarget;
}

export const Button = (props: IProps) => {
	const { to, loading, disabled, className, children, target, ...otherProps } = props;

	if (to !== undefined && disabled !== true) {
		return (
			<Link to={to} className={classNames('btn', className)} target={target}>
				<span className="btn-content mb-0 pb-0">{children}</span>
			</Link>
		);
	}

	return (
		<button
			className={classNames('btn', className, loading === true && 'btn-loading')}
			disabled={disabled === true || loading === true}
			{...otherProps}
		>
			<span className="btn-content mb-0 pb-0">
				{children}
				{loading === true && (
					<Spinner small={true} className="ms-2" />
				)}
			</span>
		</button>
	);
};

