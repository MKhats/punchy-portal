import axios from 'axios';

const tenantAPI = {

	getTenant: (itemId?: string) => {
		return axios.get(`/tenant/${itemId}`)
			.then(response => response.data as Tenant);
	},
	getTenants: () => {
		return axios.get('/tenant')
			.then(response => response.data as Tenant[]);
	},
	getTenantNames: () => {
		return axios.get('/tenant-names').then(response => response.data as string[]);
	},
	saveTenant: (item: Tenant) => {
		return axios.post('/tenant', item)
			.then(response => response.data as Tenant);
	},

};

export default tenantAPI;