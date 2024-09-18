import React from 'react';
import { Spinner } from 'components/core';
import classNames from 'classnames';

interface IProps {
	className?: string;
}

const LoadingPage = ( props: React.PropsWithChildren<IProps> ) => {
	return (
		<div className="d-flex flex-grow-1 align-items-center justify-content-center">
			<div className={classNames('spinner-container', props.className)}>
				<Spinner className="spinner-large" />
			</div>
			{props.children}
		</div>
	);
};

export default LoadingPage;