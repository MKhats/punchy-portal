import React from 'react';
import Radio from './Radio';
import classNames from 'classnames';

export interface IRadioGroupProps<T> {
	onChange: (v: T) => void;
	options: IRadio<T>[];
	value: T;
	horizontal?: boolean;
	name?: string;
	ref?: React.RefObject<HTMLDivElement> | null;
}

export interface IRadio<T> {
	label: string;
	value: T;
	disabled?: boolean;
}

export function RadioGroup<T>(props: IRadioGroupProps<T>): JSX.Element {
	return (
		<React.Fragment>
			{props.options.map((option) => {
				return (
					<Radio
						key={`${props.name}-${option.value}`}
						className={classNames(props.horizontal === true && 'form-check-inline')}
						onChange={() => props.onChange(option.value)}
						checked={option.value === props.value}
						label={option.label}
						disabled={option.disabled}
						name={props.name}
					/>
				);
			})}
		</React.Fragment>
	);
}

export default RadioGroup;
