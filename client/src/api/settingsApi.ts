import axios from 'axios';

const settingsAPI = {
	getSettings: () => {
		return axios.get('anon/web/settings')
			.then(response => response.data as WebSettings);
	},
};

export default settingsAPI;