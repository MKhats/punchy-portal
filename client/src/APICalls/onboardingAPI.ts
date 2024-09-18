import axios, { AxiosError } from 'axios';

const onboardingAPI = {
	donor: {
		getDonorList: async () => {
			const response = await axios.get('/donors')
				.then((data: { data: DonorDTO[]; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		postDonor: async (request: DonorDTO) => {
			const response = await axios.post(`/donor/${request.id}`, request)
				.then((data: { data: DonorDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		getDonor: async (id: number) => {
			const response = await axios.get(`/donor/${id}`)
				.then((data: { data: DonorDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deleteDonor: async (dataToSend: number) => {
			const response = await axios.post(`/deleteDonor/${dataToSend}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
	}
	,
	bidder: {
		getBidderList: async (): Promise<BidderDTO[] | null> => {
			const response = await axios.get('/bidders')
				.then((data: { data: BidderDTO[]; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;

		},
		postBidder: async (request: BidderDTO) => {
			const response = await axios.post(`/bidder/${request.id}`, request)
				.then((data: { data: BidderDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		getBidder: async (id: number) => {
			const response = await axios.get(`/bidder/${id}`)
				.then((data: { data: BidderDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deleteBidder: async (dataToSend: number) => {
			const response = await axios.post(`/deleteBidder/${dataToSend}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
	}
	,
	merchandise: {
		getMerchandiseList: async () => {
			const response = await axios.get('/merchandises')
				.then((data: { data: MerchandiseDTO[]; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		postMerchandise: async (request: MerchandiseDTO) => {
			const response = await axios.post(`/merchandise/${request.id}`, request)
				.then((data: { data: MerchandiseDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		getMerchandise: async (id: number) => {
			const response = await axios.get(`/merchandise/${id}`)
				.then((data: { data: MerchandiseDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deleteMerchandise: async (dataToSend: number) => {
			const response = await axios.post(`/deletemerchandise/${dataToSend}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
	}
	,
	purchase: {
		getPurchaseList: async () => {
			const response = await axios.get('/purchases')
				.then((data: { data: PurchasesDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		postPurchase: async (request: PurchaseDTO) => {
			const response = await axios.post(`/purchase/${request.id}`, request)
				.then((data: { data: PurchaseDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deletePurchase: async (request: PurchaseDTO) => {
			const response = await axios.post(`/PurchaseDelete/${request.id}`, request)
				.then((data: { data: PurchaseDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		getPurchase: async (id: string) => {
			const response = await axios.get(`/purchase/${id}`)
				.then((data: { data: PurchaseDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		}
	}
	,
	dashboard: {
		getDashboard: async () => {
			console.log('getDashboard');
			const response = await axios.get('/dashboard')
				.then((data: { data: DashboardDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
	}
	,
	feedback: {
		postFeedback: async (dataToSend: {}) => {
			const response = await axios.post('/Feedback', dataToSend)
				.then((data: { data: FeedbackDTO; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		dismissFeedback: async (dataToSend: number) => {
			const response = await axios.post(`/dismissFeedback/${dataToSend}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		completeFeedback: async (dataToSend: number) => {
			const response = await axios.post(`/completeFeedback/${dataToSend}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		elevateFeedback: async (dataToSend: number) => {
			const response = await axios.post(`/elevateFeedback/${dataToSend}`)
				.then((data: { data: string; }) => {
					return data.data;
				})
				.catch((err: AxiosError) => {
					console.error({ error: err.message });
					return null;
				});
			return response;
		},
		deleteFeedback: async (dataToSend: number) => {
			const response = await axios.post(`/deleteFeedback/${dataToSend}`)
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
	}


};
// new methods


export default onboardingAPI;