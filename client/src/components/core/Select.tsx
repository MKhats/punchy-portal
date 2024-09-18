import React, { Ref } from 'react';
import { ActionMeta, default as ReactSelect, GroupBase, OptionsOrGroups, Props as ReactSelectProps, SelectInstance } from 'react-select';

interface IProps extends React.PropsWithChildren<ReactSelectProps> {
	error?: boolean;
	ref?: Ref<SelectInstance<unknown, boolean, GroupBase<unknown>>> | null;
}

export const Select = React.forwardRef<any, IProps>((props, ref) => {
	const { options, value, isMulti, onChange, error, ...otherProps } = props;
	return (
		<ReactSelect
			isMulti={isMulti || false}
			options={options}
			value={getValue(value, options)}
			onChange={onChangeVal}
			ref={ref}
			styles={{
				control: styles => ({
					...styles,
					borderColor: error ? '#F15D1E' : '#BDB3AD',
					backgroundColor: error ? '#FFE6DC' : '#FFFFFF',
				}),
				indicatorSeparator: styles => ({
					...styles,
					marginTop: 0,
					marginBottom: 0,
				}),
				indicatorsContainer: styles => ({
					...styles,
					'svg': {
						fill: '#203040',
					},
				}),
			}}
			{...otherProps}
		/>
	);

	function getValue(value: unknown, options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined) {
		if (Array.isArray(value)) {
			const val = options?.filter((v: any) => value.findIndex((j: any) => j.value === v.value) !== -1);
			return val;
		}
		if (typeof value === 'string') {
			const val = options?.filter((v: any) => v.value === value);
			return val;
		}
		return undefined;
	}

	function onChangeVal(newValue: unknown, actionMeta: ActionMeta<unknown>) {
		if (onChange === undefined) {
			return;
		}
		if (newValue && Array.isArray(newValue)) {
			const value = newValue.map(v => v.value);
			onChange(value, actionMeta);
			return;
		}
		if (newValue && Object.keys(newValue).includes('value')) {
			const thewNewValue = newValue as { value: any; label: any; };
			const value = thewNewValue.value!;
			onChange(value, actionMeta);
			return;
		}
		onChange(undefined, actionMeta);
		return undefined;
	}
});