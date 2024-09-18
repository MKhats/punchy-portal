
import { PickListContext } from 'context/PickListContext';
import React from 'react';
import { ActionMeta, default as ReactSelect, GroupBase, OptionsOrGroups, Props as ReactSelectProps } from 'react-select';

interface IProps extends Omit<ReactSelectProps, 'options' | 'filterOption'> {
	picklistTypeCode: string;
	error?: boolean;
	// Use the filterOptions if you need to filter items out of the picklist type that you don't need in your options
	filterOptions?: string[];
}
export const PickListSelect = (props: IProps) => {
	const { picklistTypeCode, value, isMulti, error, onChange, filterOptions, ...otherProps } = props;
	const PickListCxt = React.useContext(PickListContext);
	const options = getPicklistOptions(picklistTypeCode);

	return (
		<ReactSelect
			isMulti={isMulti || false}
			options={options}
			value={getValue(value, options)}
			onChange={onChangeVal}
			styles={{
				control: (styles: any) => ({ ...styles, borderColor: error ? '#F15D1E' : '#BDB3AD', backgroundColor: error ? '#FFE6DC' : '#FFFFFF' }),
			}}
			{...otherProps}
		/>
	);

	function getPicklistOptions(code: string) {
		const pickListType = PickListCxt.pickListTypes.filter(x => x.code === code);
		if (pickListType.length === 0) {
			return undefined;
		}
		const picklistOptions = PickListCxt.pickListItems.filter(x => x.pickListTypeId === pickListType[0].id);
		const options = picklistOptions.map((item) => {
			return { value: item.code, label: item.description };
		});
		if (filterOptions !== undefined) {
			return options.filter(v => v.value && !filterOptions.includes(v.value));
		}
		return options;
	}

	function getValue(value: unknown, options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined) {
		if (Array.isArray(value)) {
			const val = options?.filter((v: any) => value.findIndex((j: any) => j === v.value) !== -1);
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
};