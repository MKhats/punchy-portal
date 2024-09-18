import React from 'react';
import classNames from 'classnames';
import { ModalOverlay, Spinner } from 'components/core';
import { IconDelete } from 'assets/icons';
import { DateTime } from 'luxon';

import UploadService from 'APICalls/UploadFiles';

interface IImport {
	selectedFiles: ISelectedFiles[],
	progressInfos: IProgressInfos[],
	message: string[],
	fileInfos: any[],
	parentid: number,
	parenttype: string,
	modalOpen: boolean,
	deleteId: number,
}
interface IProgressInfos {
	fileName: string,
	percentage: number,
}
interface ISelectedFiles {
	name: string,
}
interface IUploadProps {
	setParentId?: (item: number) => void;
	parentType: DocumentParentType;
	parentId: number;
	disabled: boolean;
}


const UploadFilesComponentHook = (props: IUploadProps) => {
	const { setParentId } = props;
	const [uploadInfo, setUploadInfo] = React.useState<IImport>({
		selectedFiles: [],
		progressInfos: [],
		message: [],
		parentid: props.parentId,
		parenttype: props.parentType,
		fileInfos: [],
		modalOpen: false,
		deleteId: 0,
	}
	);
	React.useEffect(() => {
		UploadService.getFiles(props.parentId, props.parentType).then((response: any) => {
			setUploadInfo({
				...uploadInfo,
				fileInfos: response.data,
				modalOpen: false,
				progressInfos: [],
			});
		});
	}, []);

	function selectFiles(event: any) {
		setUploadInfo({ ...uploadInfo, selectedFiles: event.target.files, });
		uploadFiles(event.target.files);
		event.target.value = null;
	}

	async function upload(idx: number, file: any) {
		const newParentId: any = await UploadService.upload(file, props.parentId, props.parentType);
		const parentId = newParentId.data as number;
		setParentId !== undefined ? setParentId(parentId) : '';
		UploadService.getFiles(parentId, props.parentType).then((response: any) => {
			setUploadInfo({
				...uploadInfo,
				fileInfos: response.data,
				modalOpen: false,
				progressInfos: [],
				selectedFiles: [],
			});
		});
	}
	function uploadFiles(selectedFiles: any[]) {
		let _progressInfos = [];
		if (selectedFiles) {
			for (let i = 0; i < selectedFiles.length; i++) {
				_progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
			}
		}
		setUploadInfo(
			{
				...uploadInfo,
				progressInfos: _progressInfos,
				message: [],
			});
		for (let i = 0; i < selectedFiles.length; i++) {
			upload(i, selectedFiles[i]);
		}
	}
	function deleteFiles() {
		UploadService.delete(uploadInfo.deleteId).then(() => {
			const filteredArray: any[] = uploadInfo.fileInfos.filter((x: any) => x.id !== uploadInfo.deleteId);
			setUploadInfo({ ...uploadInfo, fileInfos: filteredArray, modalOpen: false });
		}
		);
	}

	return (
		<div>
			<div className="row my-3">
				<div className="col-12">
					<label className="btn btn-default w-100 p-0">
						<input disabled={props.disabled}
							className={classNames('form-control', uploadInfo.fileInfos.length === 0 && 'is-invalid')} type="file" multiple={true} title="Input" onChange={selectFiles} />
					</label>
				</div>
			</div>
			<div className="card">
				<ul className="list-group list-group-flush">
					{uploadInfo.fileInfos && uploadInfo.fileInfos.map((file: any, index: number) => (
						file.deleted === false &&
						<li className="list-group-item" key={`file-${index}`}>
							<div className="d-flex">
								<a target="_blank" rel="noreferrer" href={file.documentURL} className="text-wrap align-self-center mw-100">
									{file.documentName}
								</a>
								<span onClick={() => setUploadInfo({ ...uploadInfo, modalOpen: true, deleteId: file.id })} className="ms-2 hover-icon " > <IconDelete /></span>
							</div>
							<small className="d-block mt-1 text-gray-600">Uploaded {DateTime.fromISO(file.uploadDate).toLocaleString(DateTime.DATE_MED)}</small>
						</li>
					))}
					{uploadInfo.progressInfos && uploadInfo.progressInfos.map((progress: any, index: number) => (
						<li className="list-group-item" key={`progress-${index}`}>
							<span>{progress.fileName}<Spinner small={true} className="ms-2 text-secondary" /></span>
						</li>
					)
					)}
				</ul>
			</div>
			<ModalOverlay
				isOpen={uploadInfo.modalOpen === true}
				modalSize="sm"
				confirmButtonAction={() => deleteFiles()}
				cancelButtonAction={() => {
					const modalState = false;
					setUploadInfo({ ...uploadInfo, modalOpen: modalState, deleteId: 0 });
				}}
				onRequestClose={() => setUploadInfo({ ...uploadInfo, modalOpen: false })}
				confirmButtonChildren="Delete"
				cancelButtonChildren="Cancel"
			>
				Are you sure you want to delete this file ?
			</ModalOverlay>
		</div>
	);
};

export default UploadFilesComponentHook;