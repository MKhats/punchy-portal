import React from 'react';
import { DataTable, LoadingPage, ModalOverlay, Page, PageHero } from 'components/core';
import { ActionIcon } from 'components/core';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import coreAPI from 'api/coreAPI';
import { useToast } from 'components/customHooks/useToast';

const FeedbackList = () => {
	const navigate = useNavigate();
	const [feedbackList, setFeedbackList] = React.useState<FeedbackDTO[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [deleteFeedbackId, setDeleteFeedbackId] = React.useState<number | null>(null);
	const toast = useToast();

	const handleCancel = () => {
		setDeleteFeedbackId(null);
	};

	const handleDelete = async () => {
		if (deleteFeedbackId) {
			const response = await coreAPI.feedback.deleteFeedback(deleteFeedbackId);
			if (response !== null) {
				toast.success('Feedback Deleted');
				setFeedbackList(currentFeedbacks => currentFeedbacks.filter(x => x.id != deleteFeedbackId));
			} else {
				toast.error('Unable to delete Feedback');
			}
			setDeleteFeedbackId(null);
		}
	};

	const openDeleteModal = (row: any) => {
		setDeleteFeedbackId(row.original.id);
	};

	const openFeedback = (row: any) => {
		navigate(`/feedback/${row.original.id}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	React.useEffect(() => {
		async function getFeedbacks() {
			const feedbacks = await coreAPI.feedback.getFeedbackList();
			if (feedbacks !== null) {
				setFeedbackList(feedbacks);
			} else {
				toast.error('Unable to retrieve feedback list');
			}
			setLoading(false);
		}
		getFeedbacks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// This is defined here so that the columns array isn't recreated every time the render function is called.
	const columns = [
		{
			Header: 'Feedback ID',
			accessor: 'id',
			show: false
		},
		{
			Header: 'Type',
			accessor: 'feedbackType'
		},
		{
			Header: 'Email',
			accessor: 'userEmail'
		},
		{
			Header: 'Submitted Date',
			accessor: 'submittedDate',
			Cell: (rowInfo: any) => {
				const dt = DateTime.fromISO(rowInfo.value);
				return dt.toLocaleString(DateTime.DATETIME_MED);
			},
		},
		{
			Header: 'Status',
			accessor: 'statusName',
		},
		{
			accessor: 'Actions',
			Cell: (rowInfo: FeedbackDTO) =>
				<React.Fragment>
					<ActionIcon title="Delete Feedback" type="delete" onClick={() => { openDeleteModal(rowInfo); }} />
					<ActionIcon title="Details" type="open" onClick={() => { openFeedback(rowInfo); }} />
				</React.Fragment>,
			Filter: <React.Fragment />,
			Header: '',
			id: 'Actions'
		},

	];
	if (loading) {
		return <LoadingPage />;
	}
	return (
		<Page title="Feedback List">
			<PageHero title="Feedback List">
			</PageHero>
			<div className="container-fluid">
				<DataTable
					data={feedbackList}
					columns={columns}
					resizable={true}
					sortable={true}
					noDataText="No feedback items found."
				/>
				<ModalOverlay
					isOpen={deleteFeedbackId !== null}
					modalSize="md"
					onRequestClose={handleCancel}
					headerChildren="Delete Feedback item?"
					confirmButtonChildren="Delete"
					cancelButtonChildren="Cancel"
					cancelButtonAction={handleCancel}
					confirmButtonAction={handleDelete}
				>
					Are you sure you want to delete this?
				</ModalOverlay>
			</div>
		</Page>
	);

};

export default FeedbackList;