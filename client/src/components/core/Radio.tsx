import React from 'react';
import classNames from 'classnames';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string | undefined;
}

const Radio = (props: IProps) => {
	const { label, className, ...otherProps } = props;
	return (
		<div className={classNames(className, 'form-check')}>
			<label className="form-check-label" htmlFor={props.name} onClick={(e) => handleOnClick(e)}>
				<input className="form-check-input" type="radio" {...otherProps}  />
				{label}
			</label>
		</div>
	);

	function handleOnClick(_e: React.MouseEvent) {
		if ( props.onChange !== undefined) {
			props.onChange({} as React.ChangeEvent<HTMLInputElement>);
		}
	}
};

export default Radio;