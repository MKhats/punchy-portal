import React from 'react';
import classNames from 'classnames';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	isSwitch?: boolean; // switch is a reserved word
}

const Checkbox = (props: IProps) => {
	const { label, className, isSwitch, ...otherProps } = props;
	return (
		<div className={classNames(isSwitch === true ? 'form-switch' : 'form-check', className)}>
			<label className="form-check-label" htmlFor={props.name} onClick={(e) => handleOnClick(e)}>
				<input className="form-check-input" id={props.name} type="checkbox" {...otherProps} />
				{label}
			</label>
		</div>
	);

	function handleOnClick(_e: React.MouseEvent) {
		if (props.onChange !== undefined) {
			props.onChange({} as React.ChangeEvent<HTMLInputElement>);
		}
	}
};

export default Checkbox;