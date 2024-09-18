
import axios from 'axios';


const UploadFilesService = {
	async upload(file: any, id: number, parentType: DocumentParentType) {
		let formData = new FormData();
		formData.append('file', file);
		formData.append('parentType', parentType);
		formData.append('parentId', id.toString());
		return axios.post('/document', formData, {});
	},
	async delete(fileId: number) {
		let formData = new FormData();
		formData.append('Id', fileId.toString());
		return axios.post('documentdelete', formData, {});
	},
	async getFiles(parentid: number, parenttype: string) {
		return axios.get(`documents/${parentid}/${parenttype}`);
	}
};
export default UploadFilesService;