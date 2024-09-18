import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface IProps extends React.HTMLAttributes<HTMLElement> {
	title?: string;
	parentRoute?: string;
}

const PageHero = (props: IProps) => {
	const { title, className, parentRoute, children, ...otherProps } = props;
	return (
		<header className={classNames('container-fluid page-hero', title && children && 'd-flex justify-content-between', className)} {...otherProps}>
			<div className="page-hero-title">
				{parentRoute && <Link to={`${parentRoute}`}>&lt; Go Back</Link>}
				{title && <h1 className="mb-0">{title}</h1>}
			</div>
			{children}
		</header>
	);
};

export default PageHero;
