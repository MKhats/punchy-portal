import React from 'react';
import pickListAPI from 'api/pickListAPI';
import { LoadingPage } from 'components/core';

interface IPicklistContext {
	pickListTypes: PickListType[];
	pickListItems: PickListItem[];
	filterByPickListItem: (picklistType: string) => (filter: any, row: any) => boolean;
	setColumnValue: (pickListItemId: number) => string | undefined;
}

const PickListProvider = (props: any) => {

	const [pickListTypes, setPickListTypes] = React.useState([] as PickListType[]);
	const [pickListItems, setPickListItems] = React.useState([] as PickListItem[]);
	const [isInitializing, setIsInitializing] = React.useState(true);

	React.useEffect(() => {
		pickListAPI.getPickListItems()
			.then(items => setPickListItems(items))
			.then(() => pickListAPI.getPickListTypes()
				.then((items) => setPickListTypes(items)))
			.then(() => setIsInitializing(false));
	}, []);

	const filterByPickListItem = (picklistType: string) => (filter: any, row: any) => {
		const items = pickListItems.filter(pItem => pItem.pickListType.code === picklistType);
		const foundItem = items.find(pItem => pItem.description!.indexOf(filter.value) !== -1);
		if (filter.value === undefined && filter.value === '') {
			return true;
		}
		if (foundItem) {
			return row[filter.id] === foundItem!.id;
		}
		return false;
	};

	const setColumnValue = (picklistItemId: number) => {
		const pItemValue = pickListItems.find(item => item.id! === picklistItemId);
		if (pItemValue) {
			if (pItemValue.pickListType.code === 'SkillCategory') {
				const desc = pItemValue.description!.substring(0, pItemValue.description!.indexOf('-'));
				return desc;
			}
			return pItemValue.description;

		} else {
			return '';
		}
	};


	return (
		<PickListContext.Provider value={{
			pickListTypes,
			pickListItems,
			filterByPickListItem,
			setColumnValue
		}}>
			{isInitializing ? <LoadingPage /> : props.children}
		</PickListContext.Provider>
	);
};
export default PickListProvider;
export const PickListContext = React.createContext<IPicklistContext>({} as IPicklistContext);
