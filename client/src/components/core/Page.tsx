import React from 'react';
import classNames from 'classnames';
import { Utils } from 'utils';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
}

const Page = (props: IProps) => {
	const { className, title, ...otherProps } = props;

	React.useEffect(() => {
		if (title !== undefined && title !== '') {
			Utils.setDocTitle(props.title);
		}
	});

	return (
		<div className={classNames('wrapper page-content-wrapper', className)} {...otherProps} />
	);
};

export default Page;
