import React from 'react';
import classNames from 'classnames';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	small?: boolean;
	loadingText?: string;
}

const Spinner = (props: IProps) => {
	const { className, small, role, loadingText, ...otherProps } = props;
	return (
		<div
			className={classNames('spinner-border', small && 'spinner-border-sm', className)}
			role={role || 'status'}
			{...otherProps}
		>
			<span className="visually-hidden">{loadingText || 'Loading...'}</span>
		</div>
	);
};

export default Spinner;
