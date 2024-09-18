import React from 'react';
import CheckBox from './CheckBox';
import classNames from 'classnames';
interface IProps {
	onChange: (v: string[]) => void;
	value?: string[];
	options: ICheckBox[];
	horizontal?: boolean;
	name?: string;
	ref?: React.RefObject<HTMLDivElement> | null;
}

export interface ICheckBox {
	label: string;
	value: string;
	name?: string;
	disabled?: boolean;
}

export function CheckboxGroup(props: IProps): JSX.Element {
	const onSelect = (e: string) => props.onChange(handleSelect(props.value || [], e));
	return (
		<React.Fragment>
			{props.options.map((option) => {
				return (
					<CheckBox
						key={`${props.name}-${option.value}`}
						className={classNames(props.horizontal === true && 'form-check-inline')}
						onChange={() => onSelect(option.value)}
						checked={isChecked(props.value || [], option.value)}
						label={option.label}
						value={option.value}
						disabled={option.disabled}
						name={option.name || option.label.replaceAll(' ', '')}
					/>
				);
			})}
		</React.Fragment>
	);
}

const handleSelect = (oldValues: any[], newValue: any) => {
	if (!oldValues || oldValues.length === 0) {
		return [newValue];
	}
	return (oldValues.indexOf(newValue) === -1)
		? [...oldValues, newValue]
		: oldValues.filter(i => i !== newValue);
};

const isChecked = (oldValues: any[], nevValue: any) => {
	return oldValues && (oldValues.indexOf(nevValue) > -1);
};


export default CheckboxGroup;
