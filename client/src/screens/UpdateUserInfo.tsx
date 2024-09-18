import React from 'react';
import { Button, FormGroup, Input, Page, PageHero } from 'components/core';
import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from 'context/AuthContext';
import coreAPI from 'api/coreAPI';
import { useToast } from 'components/customHooks/useToast';
import { emailRegex } from 'utils';

interface FormExample {
	email: string;
	firstName: string;
	lastName: string;
}

const UpdateUserInfo = () => {
	const { currentUser } = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const toast = useToast();
	const { handleSubmit, control } = useForm<FormExample>({
		defaultValues: {
			email: currentUser.email,
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});


	const onUserDetailsSave = (formData: FormExample) => {
		setIsLoading(true);

		const user: UpdateTenantUserInfoRequest = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
		};

		coreAPI.updateUserInfo(user)
			.then(() => {
				setIsLoading(false);
				toast.success('User successfully saved');
			});
	};

	return (
		<Page title="Update Personal Information">
			<PageHero title="Update Personal Information" parentRoute="/settings/profile">
			</PageHero>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<Controller
							control={control}
							name="firstName"
							rules={{ required: 'Enter first name' }}
							render={({ field, fieldState }) =>
								<FormGroup label="First Name" field={field} fieldState={fieldState}>
									<Input
										{...field}
										placeholder="Enter first name"
									/>
								</FormGroup>
							}
						/>

						<Controller
							control={control}
							name="lastName"
							rules={{ required: 'Enter last name' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Last Name" field={field} fieldState={fieldState}>
									<Input
										{...field}
										placeholder="Enter last name"
									/>
								</FormGroup>
							}
						/>
						<Controller
							control={control}
							name="email"
							rules={{
								required: 'Email is required',
								pattern: {
									value: emailRegex,
									message: 'Not an email address',
								},
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="Email" field={field} fieldState={fieldState}>
									<Input
										type="email"
										{...field}
									/>
								</FormGroup>
							}
						/>
						<Button
							className="btn-primary"
							disabled={isLoading}
							onClick={handleSubmit(onUserDetailsSave)}
						>
							Update
						</Button>
					</div>
				</div>
			</div>
		</Page >
	);

};

export default UpdateUserInfo;
