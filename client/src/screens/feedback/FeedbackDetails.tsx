import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import coreAPI from 'api/coreAPI';
import { TextArea, RadioGroup, Input, Button, Page, PageHero, FormGroup, Select, LoadingPage } from 'components/core';
import { feedbackTypeList } from './FeedbackForm';
import { useToast } from 'components/customHooks/useToast';
import FeedbackDetailsPanel from 'screens/feedback/FeedbackDetailsPanel';

interface FeedbackForm {
	description: string;
	priority: number;
	severity: string;
	feedbackType: FeedbackTypeEnum;
	status: string;
}

const FeedbackDetails = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [feedback, setFeedback] = React.useState<FeedbackDTO | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const { handleSubmit, control, reset, getValues } = useForm<FeedbackForm>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});
	const statusOptions = [
		{ value: 'dismiss', label: 'Dismiss' },
		{ value: 'conclude', label: 'Conclude' },
		{ value: 'elevate', label: 'Elevate' },
	];

	const toast = useToast();

	const submitData = async () => {
		if (feedback == null) {
			return;
		}

		if (getValues().status === 'dismiss') {
			dismissFeedback();
		}

		if (getValues().status === 'complete') {
			completeFeedback();
		}

		if (getValues().status === 'elevate') {
			elevateFeedback();
		}

		const result = await coreAPI.feedback.postFeedback({ ...feedback, ...getValues() });
		if (result) {
			toast.success('Feedback Saved');
			navigate('/feedback/feedbacklist');
		} else {
			toast.error('Unable to save Feedback');
		}
	};

	const dismissFeedback = async () => {
		if (feedback == null) {
			return;
		}
		const response = await coreAPI.feedback.dismissFeedback(feedback.id!);
		if (response) {
			toast.success('Feedback Dismissed');
		} else {
			toast.error('Unable to dismiss Feedback');
		}
	};

	const completeFeedback = async () => {
		if (feedback == null) {
			return;
		}
		const result = await coreAPI.feedback.completeFeedback(feedback.id!);
		if (result) {
			toast.success('Feedback Completed');
		} else {
			toast.error('Unable to complete Feedback');
		}
	};

	const elevateFeedback = async () => {
		if (feedback == null) {
			return;
		}
		const result = await coreAPI.feedback.elevateFeedback(feedback.id!);
		if (result) {
			toast.success('Feedback Elevated');
		} else {
			toast.error('Unable to elevate Feedback');
		}
	};

	React.useEffect(() => {
		async function getFeedback(feedbackId: number) {
			const result = await coreAPI.feedback.getFeedback(feedbackId);
			if (result != null) {
				setFeedback(result);
				reset(result);
			} else {
				toast.error('Unable to retrieve Feedback information');
			}
			setLoading(false);
		}
		getFeedback(Number(params.feedbackId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading || feedback == null) {
		return <LoadingPage />;
	}
	return (
		<Page title="Feedback">
			<PageHero title="Feedback Details" />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<FeedbackDetailsPanel
							feedback={feedback}
						/>
					</div>
					<div className="col-lg-9">
						<div className="row">
							<Controller
								control={control}
								name="feedbackType"
								rules={{
									required: 'This field is required',
								}}
								render={({ field, fieldState }) =>
									<FormGroup label="Feedback type" field={field} fieldState={fieldState}>
										<RadioGroup
											options={feedbackTypeList}
											value={field.value}
											onChange={field.onChange}
										/>
									</FormGroup>
								}
							/>
							<div className="col-lg-6">
								<Controller
									control={control}
									name="priority"
									rules={{
										required: 'This field is required',
									}}
									render={({ field, fieldState }) =>
										<FormGroup label="Priority" field={field} fieldState={fieldState}>
											<Input
												type="number"
												error={!!fieldState.error?.message}
												{...field}
											/>
										</FormGroup>
									}
								/>
							</div>
							<div className="col-lg-6">
								<Controller
									control={control}
									name="severity"
									rules={{
										required: 'This field is required',
									}}
									render={({ field, fieldState }) =>
										<FormGroup label="Severity" field={field} fieldState={fieldState}>
											<Input
												error={!!fieldState.error?.message}
												{...field}
											/>
										</FormGroup>
									}
								/>
							</div>
							<Controller
								control={control}
								name="description"
								render={({ field, fieldState }) => (
									<FormGroup label="Notes" className="h-100" field={field} fieldState={fieldState}>
										<TextArea
											id={field.name}
											error={!!fieldState.error?.message}
											{...field}
											ref={null}
										/>
									</FormGroup>
								)
								}
							/>
							<div className="col-lg-6">
								<Controller
									control={control}
									name="status"
									render={({ field, fieldState }) => (
										<FormGroup label="Status" field={field} fieldState={fieldState}>
											<Select
												id={field.name}
												{...field}
												options={statusOptions}
												onChange={field.onChange}
												className="pb-3"
												ref={null}
											/>
										</FormGroup>
									)
									}
								/>
							</div>
							<div className="d-flex mt-2">
								<Button
									className="btn-primary"
									onClick={handleSubmit(submitData)}
								>
									Save
								</Button>
								<Button
									className="btn-outline-primary ms-3"
									onClick={() => {
										navigate('/feedback/feedbacklist');
									}}
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default FeedbackDetails;
