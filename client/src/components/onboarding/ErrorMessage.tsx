import React from 'react';
import { FieldError } from 'react-hook-form';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error: FieldError | undefined;
}

const ErrorMessage = (props: IProps) => {
	return (
		<React.Fragment>
			{props.error && <div className="invalid-feedback">{props.error!.message}</div>}
		</React.Fragment>
	);
};

export default ErrorMessage;