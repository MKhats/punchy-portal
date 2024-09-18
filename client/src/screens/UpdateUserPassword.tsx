import React from 'react';
import { Page, PageHero, Button, PasswordInput, FormGroup } from 'components/core';
import { Controller, useForm } from 'react-hook-form';
import coreAPI from 'api/coreAPI';
import { useToast } from 'components/customHooks/useToast';

interface FormExample {
	password: string;
	confirmPassword: string;
}

const FormControlExamplePage = () => {

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isPassVisible, setIsPassVisible] = React.useState<boolean>(false);
	const toast = useToast();
	const { handleSubmit, control, watch } = useForm<FormExample>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});


	const onUserDetailsSave = (formData: FormExample) => {
		setIsLoading(true);
		const user: UpdateTenantUserPasswordRequest = {
			password: formData.password
		};

		coreAPI.updateUserPassword(user)
			.then(() => {
				setIsLoading(false);
				toast.success('User password successfully changed');
			});
	};
	return (
		<Page title="Reset Password">
			<PageHero title="Update password" parentRoute="/settings/profile" />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<Controller
							control={control}
							name="password"
							rules={{
								required: 'You must enter a password',
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,64}$/,
									message: 'Password does not meet requirements',
								},
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="New Password" field={field} fieldState={fieldState}>
									<PasswordInput
										{...field}
										isPassVisible={isPassVisible}
										setIsPassVisible={setIsPassVisible}
									/>
								</FormGroup>
							}
						/>
						<p>The password must be between 8 and 64 characters.</p>
						<p>The password must have the following:
							<li>a lowercase letter</li>
							<li>an uppercase letter</li>
							<li>a digit</li>
							<li>a symbol</li>
						</p>
						<Controller
							control={control}
							name="confirmPassword"
							rules={{
								required: 'You must confirm your password',
								validate: (val: string | undefined) => {
									if (watch('password') !== val) {
										return 'Your passwords do not match';
									}
									return true;
								}
							}}
							render={({ field, fieldState }) =>
								<FormGroup label="Confirm Password" field={field} fieldState={fieldState}>
									<PasswordInput
										{...field}
										isPassVisible={isPassVisible}
										setIsPassVisible={setIsPassVisible}
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
		</Page>
	);

};

export default FormControlExamplePage;
