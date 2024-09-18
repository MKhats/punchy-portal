/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';


interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	prepend?: string;
	append?: string;
	error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { type, className, prepend, error, append, ...otherProps } = props;
	const InputField =
		<input
			type={type || 'text'}
			id={props.name}
			ref={ref}
			{...otherProps}
			className={classNames('form-control', error && 'is-invalid', className)}
		/>;


	if (append !== undefined || prepend !== undefined) {
		return (
			<div className={classNames('input-group')}>
				{(prepend !== undefined) && (
					<div className="input-group-prepend">
						<div className="input-group-text">{prepend}</div>
					</div>
				)}
				{InputField}
				{(append !== undefined) && (
					<div className="input-group-append">
						<div className="input-group-text">{append}</div>
					</div>
				)}
			</div>
		);
	}
	return InputField;
});
