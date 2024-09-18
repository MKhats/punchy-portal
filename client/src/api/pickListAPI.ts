import axios from 'axios';

const pickListAPI = {
	getPickListItem: (itemId?: string) => {
		return axios.get(`/pick-list-items/${itemId}`)
			.then(response => response.data as PickListItemRequest);
	},
	getPickListItems: () => {
		return axios.get('/pick-list-items')
			.then(response => response.data as PickListItem[]);
	},
	getPickListType: (id: string) => {
		return axios.get(`/pick-list-types/${id}`)
			.then(response => response.data as PickListType);
	},
	getPickListTypes: () => {
		return axios.get('/pick-list-types') // todo: see if axios or an interceptor can auto add the apiUrl.
			.then(response => response.data as PickListType[]);
	},
	savePickListItem: (item: PickListItemRequest) => {
		return axios.post('/pick-list-items', item)
			.then(response => response.data as PickListItem);
	},
	savePickListType: (type: PickListTypeRequest) => {
		return axios.post('/pick-list-types', type)
			.then(response => response.data as PickListType);
	},
	getPickListItemByType: (code: string): Promise<PickListItem[]> => {
		return axios.get(`/pick-list-items/type/${code}`)
			.then(res => res.data);
	}
};

export default pickListAPI;