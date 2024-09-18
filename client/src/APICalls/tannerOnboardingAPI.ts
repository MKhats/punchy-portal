import axios, { AxiosError } from 'axios';

export const tannerOnboardingAPI = {
	products : {
		getProducts: async () => {
			const response = await axios.get('/products')
				.then((data: { data: ProductDTO[]; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		getProduct: async (id: number) => {
			const response = await axios.get(`/products/${id}`)
				.then((data: { data: ProductDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		updateProduct: async (data: ProductDTO) => {
			const { id } = data;
			const response = await axios.post(`/products/${id}`, data)
				.then((data: { data: ProductDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deleteProduct: async (productId: number) => {
			const response = await axios.post(`/deleteProduct/${productId}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		}
	},
	tables : {
		getTables: async () => {
			const response = await axios.get('/tables')
				.then((data: { data: TablesDTO[]; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		getTable: async (id: number) => {
			const response = await axios.get(`/tables/${id}`)
				.then((data: { data: TablesDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		updateTable: async (data: TablesDTO) => {
			const { id } = data;
			const response = await axios.post(`/tables/${id}`, data)
				.then((data: { data: TablesDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deleteTable: async (tableId: number) => {
			const response = await axios.post(`/tables/${tableId}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		}
	},
};




export default tannerOnboardingAPI;