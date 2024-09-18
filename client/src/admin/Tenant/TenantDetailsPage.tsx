import React from 'react';
import TenantAPI from 'api/tenantAPI';
import { Button, Page, PageHero, Input, RadioGroup, FormGroup } from 'components/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from 'components/customHooks/useToast';
import { Controller, useForm } from 'react-hook-form';


const TenantDetailsPage = () => {
	const { tenantId } = useParams();
	const navigate = useNavigate();
	const tenantIdNumber = Number(tenantId);
	const toast = useToast();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const methods = useForm<Tenant>({
		defaultValues: {
			name: '',
			isActive: true,
		}
	});

	React.useEffect(() => {
		async function getTenant() {
			try {
				const tenantData = await TenantAPI.getTenant(tenantId);
				methods.reset(tenantData);
			} catch (error) {
				throw (error);
			}
		}
		if (tenantIdNumber && tenantIdNumber > 0) {
			getTenant();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tenantId, tenantIdNumber]);

	return (
		<Page>
			<PageHero title={tenantId !== '0' ? 'Edit Tenant' : 'Add New Tenant'} />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<Controller
							control={methods.control}
							name="name"
							rules={{
								required: 'This is a required field'
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="Tenant Name" field={field} fieldState={fieldState}>
									<Input
										error={!!fieldState.error?.message}
										{...field}
										placeholder="Enter an tenant name"
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-4">
						<Controller
							control={methods.control}
							name="isActive"
							render={({ field, fieldState }) =>
								<FormGroup label="Status" field={field} fieldState={fieldState}>
									<RadioGroup<boolean>
										value={field.value ?? true}
										onChange={field.onChange}
										options={[
											{
												label: 'Active',
												value: true
											},
											{
												label: 'Inactive',
												value: false
											}
										]}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<Button
					className="btn-primary me-2"
					onClick={methods.handleSubmit(submitTenant)}
					loading={isLoading}
					disabled={isLoading}
				>
					Save
				</Button>
				<Button
					className="btn-outline-primary"
					onClick={onCancelClick}
				>
					Cancel
				</Button>

			</div>
		</Page>
	);


	function onCancelClick() {
		navigate('/admin/tenants');
	}

	function submitTenant(values: Tenant) {
		setIsLoading(true);

		TenantAPI.saveTenant(values)
			.then(({ id }) => {
				if (tenantIdNumber <= 0) {
					setIsLoading(false);
					// if on new Org page, redirect to Edit page, else redirect to list page
					toast.success('Successfully created Tenant');
					// history.push takes state object as a second argument.
					navigate(`/admin/tenants/${id}`);
				} else {
					toast.success('Tenant updated');
					navigate('/admin/tenants');
				}
			})
			.catch((_err: any) => {
				toast.error('Something went wrong!', {
					autoClose: 3000,
					theme: 'dark'
				});
				setIsLoading(false);
			});
	}
};

export default TenantDetailsPage;
