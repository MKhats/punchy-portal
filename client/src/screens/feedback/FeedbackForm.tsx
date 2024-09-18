import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Page, PageHero, RadioGroup, Button, TextArea, FormGroup, LoadingPage } from 'components/core';
import { useNavigate } from 'react-router-dom';
import coreAPI from 'api/coreAPI';
import { useFeedbackMetaData } from './useFeedbackMetaData';
import { useAppHistoryTrackerContext } from 'screens/feedback/useAppHistoryTracker';
import { useToast } from 'components/customHooks/useToast';

export const feedbackTypeList = [{ value: 'Bug', label: 'Bug' }, { value: 'Issue', label: 'Request' }];

const FeedbackForm = () => {
	const feedbackMetaData = useFeedbackMetaData();
	const navigate = useNavigate();
	const history = useAppHistoryTrackerContext();
	const [loading, setLoading] = React.useState<boolean>(false);
	const toast = useToast();
	const { handleSubmit, control } = useForm<FeedbackDTO>({
		defaultValues: {
			description: '',
			feedbackType: 'Bug',
			...feedbackMetaData,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const submitData = async (data: FeedbackDTO) => {
		setLoading(true);
		const feedbackDTO: FeedbackDTO = { ...data, pagesVisited: history.historyQueueRef.current.join(', ') };
		const feedback = await coreAPI.feedback.postFeedback(feedbackDTO);
		if (feedback) {
			toast.success('Feedback Saved');
			navigate(-1);
		} else {
			toast.error('Unable to save Feedback');
		}
		setLoading(false);
	};

	if (loading) {
		return <LoadingPage />;
	}
	return (
		<Page title="Feedback">
			<PageHero title="Feedback" />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<Controller
							control={control}
							name="feedbackType"
							rules={{
								required: 'This field is required',
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="Feedback Type" className="pb-2" field={field} fieldState={fieldState}>
									<RadioGroup
										value={field.value}
										onChange={field.onChange}
										options={feedbackTypeList}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4">
						<Controller
							control={control}
							name="description"
							render={({ field, fieldState }) =>
								<FormGroup label="Feedback description" className="pb-3" field={field} fieldState={fieldState}>
									<TextArea
										error={!!fieldState.error?.message}
										{...field}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<Button
					className="btn-primary"
					onClick={handleSubmit(submitData)}
				>
					Submit
				</Button>
				<Button
					className="btn-outline-primary ms-3"
					onClick={() => {
						navigate(-1);
					}}
				>
					Cancel
				</Button>
			</div>
		</Page>
	);
};

export default FeedbackForm;
