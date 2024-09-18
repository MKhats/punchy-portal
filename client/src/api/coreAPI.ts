import axios, { AxiosError } from 'axios';

const feedback = {
	postFeedback: async (dataToSend: FeedbackDTO) => {
		const response = await axios.post('/feedback', dataToSend)
			.then((data: { data: string; }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
	getFeedbackList: async () => {
		const response = await axios.get('/feedbacks')
			.then((data: { data: FeedbackDTO[] }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
	getFeedback: async (id: number) => {
		const response = await axios.get(`/feedback/${id}`)
			.then((data: { data: FeedbackDTO }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
	dismissFeedback: async (id: number) => {
		const response = await axios.post('/dismissFeedback', { id })
			.then((data: { data: string; }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
	completeFeedback: async (id: number) => {
		const response = await axios.post('/completeFeedback', { id })
			.then((data: { data: string; }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
	elevateFeedback: async (id: number) => {
		const response = await axios.post('/elevateFeedback', { id })
			.then((data: { data: string; }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
	deleteFeedback: async (id: number) => {
		const response = await axios.post('/deleteFeedback', { id })
			.then((data: { data: string; }) => {
				return data.data;
			})
			.catch((err: AxiosError) => {
				console.error({ error: err.message });
				return null;
			});
		return response;
	},
};

const coreAPI = {
	feedback,
	updateUserInfo: async (request: UpdateTenantUserInfoRequest) => {
		const response = await axios.post('/tenant/user-update-info', request);
		return response.data as UserDetailsDTO;
	},
	updateUserPassword: async (request: UpdateTenantUserPasswordRequest) => {
		const response = await axios.post('/tenant/user-update-password', request);
		return response.data as UserDetailsDTO;
	},
	// new methods
	getTenantUsers: async (request: GetAllTenantUsersRequest) => {
		const response = await axios.get(`/tenant/${request.tenantId}/all-users`);
		return response.data as UserDetailsDTO[];
	},
	getTenantUser: async (request: GetTenantUserRequest) => {
		const response = await axios.get(`/tenant/${request.tenantId}/users/${request.userId}`);
		return response.data as UserDetailsDTO;
	},
	postTenantUser: async (request: UpsertTenantUserRequest) => {
		const response = await axios.post(`/tenant/${request.tenantId}/users`, request);
		return response.data as UserDetailsDTO;
	},
	deleteTenantUser: (request: DeleteTenantUserRequest) => {
		return axios.delete(`/tenant/${request.tenantId}/users`, { data: request });
	},
	getTenantUserEmails: async (request: GetTenantUserEmailsRequest) => {
		const response = await axios.get(`/tenant/${request.tenantId}/user-emails`);
		return response.data as string[];
	},
	getRoles: async () => {
		const response = await axios.get('/roles');
		return response.data as RoleDTO[];
	},
	getRole: async (request: GetRoleRequest) => {
		const response = await axios.get(`/roles/${request.id}`);
		return response.data as RoleDTO;
	},
	postRole: async (request: PostRoleRequest) => {
		const response = await axios.post('/roles', request);
		return response.data as RoleDTO;
	},
	getPermissions: async () => {
		const response = await axios.get('/permissions');
		return response.data as PermissionDTO[];
	}
};

export default coreAPI;