import React, { useContext } from 'react';
import { PickListContext } from 'context/PickListContext';
import { Select } from './Select';

interface IProps {
	value?: { value: string, label: string }[] | { value: string, label: string };
	onChange: (e: any) => void;
	id?: string;
	name?: string;
	className?: string;
	pickListCode: string;
	placeholder?: string;
	parentCode?: string;
	dropdownStyle?: string;
	specifiedOptions?: PickListItemResponseDTO[];
	sort?: boolean;
	isMulti?: boolean;
}

const DropdownInput = (props: IProps) => {
	const PickListCxt = useContext(PickListContext);

	const defaultValue = setDefaultValue();
	const selectValue = setSelectValue();
	const options = setOptions(props.parentCode!);

	return (
		<Select
			id={props.id}
			name={props.name}
			defaultValue={defaultValue}
			value={selectValue}
			onChange={props.onChange}
			placeholder={props.placeholder}
			filterOption={(option, inputValue) => option.label.includes(inputValue)}
			className={props.className}
			options={options.search}
			isMulti={props.isMulti !== undefined ? props.isMulti : false}
		>
		</Select>
	);

	function sortPickListItems(a: PickListItem, b: PickListItem) {
		return a.sort! < b.sort! ? -1 : 1;
	}

	function setOptions(code: string) {
		let contextItems: PickListItem[] = [];
		contextItems = (props.sort ? PickListCxt.pickListItems.sort(sortPickListItems) : PickListCxt.pickListItems)
			.filter((p: PickListItem) => p.isActive);

		if (code !== undefined || code !== '') {
			const parentItem = contextItems.find((item: PickListItem) => item.code === code);
			if (parentItem) {
				const parentItems = contextItems
					.filter((item: PickListItem) => item.pickListType.code === props.pickListCode && item.parentId === parentItem.id!);

				const searchOptions = parentItems.map(item => ({ value: item.id!.toString(), label: item.description! }));

				return ({ options: [], search: searchOptions });
			}
		}

		const filteredItems = contextItems.filter((item: PickListItem) => item.pickListType.code === props.pickListCode);
		const searchableOptions = filteredItems !== undefined && filteredItems.length > 0 ?
			filteredItems.map(item => ({ value: item.id!.toString(), label: item.description! })) : [];
		return ({ options: [], search: searchableOptions });

	}

	function setSelectValue() {
		let select;
		if (Array.isArray(props.value)) {
			const valueArray = props.value as { value: string, label: string }[]; // TODO: Forgive me my sins
			select = valueArray ? PickListCxt.pickListItems
				.filter((item: PickListItem) => item.pickListType.code === props.pickListCode && valueArray!.findIndex(value => value.value === item.id!.toString()) !== -1)
				.map((foundVal: PickListItem) => ({ value: foundVal.id!.toString(), label: foundVal.description! })) : [];
			return select;
		}
		else if (props.value === undefined || props.value === null) {
			return select;
		}
		else if ((props.value as { value: string, label: string })!.value! === undefined || (props.value as { value: string, label: string })!.value! === null) {
			return select;
		}

		else if (PickListCxt.pickListItems !== undefined && PickListCxt.pickListItems.length > 0 && props.value !== undefined) {
			const picklistItem = PickListCxt.pickListItems.find((item: PickListItem) => item.id?.toString() === (props.value as { value: string, label: string })!.value)!;
			select = { value: props.value.toString(), label: picklistItem.description! };
			return select;
		}

		return select;
	}

	function setDefaultValue() {
		let defaultValue: any[] = [];

		const defaultPicklistItems =
			PickListCxt.pickListItems!.filter((x: PickListItem) => x.isDefault! && x.pickListType.code === props.pickListCode);
		if (defaultPicklistItems) {
			defaultValue = defaultPicklistItems.map((item: PickListItem) => ({ value: item.id!.toString(), label: item.description }));
		}

		return defaultValue;
	}
};

export default DropdownInput;