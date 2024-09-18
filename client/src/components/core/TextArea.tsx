import React from 'react';
import classNames from 'classnames';

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean;
	ref?: React.RefObject<HTMLTextAreaElement> | null;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, IProps>((props, ref) => {
	const { className, error, ...otherProps } = props;
	return (
		<textarea {...otherProps} ref={ref} id={props.name} className={classNames('form-control', error && 'is-invalid', className)} />
	);
});