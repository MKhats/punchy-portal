import axios from 'axios';

const authAPI = {
	getCurrentUser: () => {
		return axios.get('/current-user')
			.then(response => response.data as CurrentUserDTO);
	},
	getRoles: () => {
		return axios.get('/roles')
			.then(response => response.data as RoleDTO[]);
	},
	getRole: (request: GetRoleRequest) => {
		return axios.get(`/roles/${request.id}`)
			.then((response) => response.data as RoleDTO);
	},
	postRole: (request: PostRoleRequest) => {
		return axios.post('/roles', request)
			.then((response) => response.data as RoleDTO);
	},
	getPermissions: () => {
		return axios.get('/permissions')
			.then(response => response.data as PermissionDTO[]);
	}
};

export default authAPI;