import request from 'request';
import fs from 'fs';

const API_URL = 'https://localhost:44305/api/types/typescript.d?MakePropertiesOptional=false';
const OUTPUT_DIR = './src/@types';
const OUTPUT_FILE = `${OUTPUT_DIR}/ServiceStackTypes.d.ts`;

function ensureDirectoryExists(directory) {
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}
}

function getTypes() {
	const options = {
		method: 'GET',
		url: API_URL,
		strictSSL: false,
		params: { ExportAsTypes: true }
	};

	request(options, (error, _, body) => {
		if (error) {
			throw new Error(error);
		}

		fs.writeFile(OUTPUT_FILE, body, err => {
			if (err) {
				throw err;
			}

			console.log(`Downloaded new types from: ${API_URL}`);
		});
	});
}

ensureDirectoryExists(OUTPUT_DIR);
getTypes();
