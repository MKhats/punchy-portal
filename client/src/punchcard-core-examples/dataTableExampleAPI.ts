import axios from 'axios';

const dataTableExampleAPI = {
	getMovieData: () => {
		return axios.get('/data-table-example-data/movies')
			.then((response) => response.data);
	}
};

export default dataTableExampleAPI;