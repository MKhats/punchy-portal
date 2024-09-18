import { Button, Checkbox, FormGroup, Input, Page, PageHero } from 'components/core';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UploadFilesComponentHook from 'components/onboarding/uploadFilesComponentHook';
import tannerOnboardingAPI from 'APICalls/tannerOnboardingAPI';

const Tables: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState<boolean>(true);

	const paramsTableId = parseInt(params.tableId!);

	const { handleSubmit, control, reset } = useForm<TablesDTO>({
		defaultValues: {
			id: 0,
			tableName: '',
			capacity: 0,
			serverName: '',
			allowAlcohol: false,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const submitData = async (data: TablesDTO) => {
		setLoading(true);
		const table = await tannerOnboardingAPI.tables.updateTable(data);
		if (table) {
			toast.success('Table Successfully Updated');
			navigate('/tables/tablelist');
		} else {
			toast.error('Unable to Update Table');
		}
		setLoading(false);
	};

	useEffect(() => {
		const getTable = async (tableId: number) => {
			const table = await tannerOnboardingAPI.tables.getTable(tableId);
			if (table) {
				reset(table);
			} else {
				toast.error('Unable to Retrieve Table Information');
			}
			setLoading(false);
		};
		getTable(paramsTableId);
	}, [paramsTableId ,reset]);

	if (loading) {
		return null;
	}

	return (
		<Page title="Table Details">
			<PageHero
				className="d-flex"
				title="Table Details"
			/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<div className="row">
							<Controller
								control={control}
								name="tableName"
								rules={
									{
										required: 'This field is required',
									}
								}
								aria-labelledby=""
								render={({ field, fieldState }) => (
									<div className="mb-3">
										<FormGroup label="Table Name" field={field} fieldState={fieldState}>
											<Input
												id={field.name}
												required={true}
												{...field}
											/>
										</FormGroup>
									</div>
								)
								}
							/>
						</div>
						<div className="row">
							<Controller
								control={control}
								name="serverName"
								aria-labelledby=""
								render={({ field, fieldState }) => (
									<div className="mb-3">
										<FormGroup label="Server Name" field={field} fieldState={fieldState}>
											<Input
												id={field.name}
												{...field}
											/>
										</FormGroup>
									</div>
								)
								}
							/>
						</div>
						<div className="row">
							<div className="col-lg-6">
								<Controller
									control={control}
									name="capacity"
									rules={
										{
											required: 'This field is required',
											validate: (value) => {
												return value > 0 || 'Capacity must be greater than 0';
											}
										}
									}
									aria-labelledby=""
									render={({ field, fieldState }) => (
										<div className="mb-3">
											<FormGroup label="Capacity" field={field} fieldState={fieldState}>
												<Input
													id={field.name}
													{...field}
												/>
											</FormGroup>
										</div>
									)
									}
								/>
							</div>
							<div className="col-lg-6">
								<Controller
									control={control}
									name="allowAlcohol"
									aria-labelledby=""
									render={({ field }) => (
										<div className="mb-3">
											<FormGroup label="Allow Alcohol" field={field}>
												<Checkbox
													id={field.name}
													checked={field.value}
													onChange={field.onChange}
													name={field.name}
												/>
											</FormGroup>
										</div>
									)
									}
								/>
							</div>
						</div>
						{paramsTableId > 0 &&
							<div className="row">
								<UploadFilesComponentHook
									parentType="Tables"
									parentId={paramsTableId}
									disabled={false}
								/>
							</div>
						}
					</div>
				</div>
				<Button
					className="btn-primary m-2"
					onClick={handleSubmit(submitData)}
				>
					Submit
				</Button>
				<Button
					className="btn-info m-2"
					onClick={() => {
						navigate('/tables/tablelist');
					}}
				>
					Cancel
				</Button>
				{paramsTableId > 0 &&
					<Button
						className="btn-primary m-2"
						onClick={() => {
							navigate(`/tables/${paramsTableId}/bidders-list`);
						}}
					>
						List of Bidders
					</Button>
				}
			</div>
		</Page>
	);
};

export default Tables;