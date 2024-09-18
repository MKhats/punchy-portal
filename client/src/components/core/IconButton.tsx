import React from 'react';
import classNames from 'classnames';
import { Link, To } from 'react-router-dom';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	to?: To;
	target?: string;
	icon?: JSX.Element;
}

export const IconButton = (props: IProps) => {
	const { to, loading, disabled, className, children, target, ...otherProps } = props;

	if (to !== undefined && disabled !== true) {
		return (
			<Link to={to} target={target} className={classNames('btn btn-icon btn-pd-fix', className, loading === true && 'btn-loading')}>
				<span className="btn-content">
					{children}
				</span>
			</Link>
		);
	}

	return (
		<React.Fragment>
			<button
				className={classNames('btn btn-icon btn-pd-fix', className, loading === true && 'btn-loading')}
				disabled={disabled === true || loading === true}
				{...otherProps}
			>
				<span className="btn-content">
					{children}
				</span>
			</button>
		</React.Fragment>
	);
};

