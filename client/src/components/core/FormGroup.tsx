import React from 'react';
import classNames from 'classnames';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	label?: string;
	required?: boolean;
	field?: ControllerRenderProps<any, any>;
	fieldState?: ControllerFieldState;
}

export const FormGroup = (props: IProps ) => {
	const { children, label, className, field, fieldState, ...otherProps } = props;
	return (
		<div className={classNames('mb-3', className)} {...otherProps}>
			{label && <label htmlFor={field?.name} className="form-label">{label}{props.required && '*'}</label>}
			{children}
			<ErrorMessage className="mt-3" fieldState={fieldState} />
		</div>
	);
};
