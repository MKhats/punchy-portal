import React, { useState, useEffect } from 'react';
import { FormGroup, ModalOverlay, Page, PageHero } from 'components/core';
import { useNavigate, useParams } from 'react-router-dom';
import coreAPI from 'api/coreAPI';
import useEffectAsync from 'components/customHooks/useEffectAsync';
import { Controller, useForm } from 'react-hook-form';
import { Input, CheckboxGroup, Button } from 'components/core';
import { useToast } from 'components/customHooks/useToast';


interface ITenantUserDetailsForm {
	firstName: string;
	lastName: string;
	emailAddress: string;
	password: string;
	roleGroup: string[];
}

const UserDetails = () => {
	const { tenantId, userId } = useParams();
	const navigate = useNavigate();
	const defaultUser: UserDetailsDTO = {
		id: userId ? +userId : -1,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		roleIds: [],
		tenantId: tenantId ? +tenantId : 1,
		isActive: true,
	};

	const [user, setUser] = useState<UserDetailsDTO>(defaultUser);
	const [roles, setRoles] = useState<RoleDTO[]>([]);
	const [permissions, setPermissions] = useState<PermissionDTO[]>([]);
	const [assignedPermissions, setAssignedPermissions] = useState<PermissionDTO[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const toast = useToast();

	const { handleSubmit, control, setValue } = useForm<ITenantUserDetailsForm>({
		defaultValues: {
			firstName: '',
			lastName: '',
			emailAddress: '',
			password: '',
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const roleOptions = roles.map(role => ({ label: role.name!, value: role.id!.toString() }));

	useEffectAsync(async (isMounted: any) => {
		setIsLoading(true);
		const roleData = await coreAPI.getRoles();
		const permissionData = await coreAPI.getPermissions();
		if (userId && +userId !== -1) {
			const tenantUser = await coreAPI.getTenantUser({ tenantId: +tenantId!, userId: +userId! });
			if (isMounted()) {
				setUser(tenantUser);
			}
		}
		if (isMounted()) {
			setRoles(roleData);
			setPermissions(permissionData);
			setIsLoading(false);
		}
	});

	useEffect(() => {
		if (user.roleIds) {
			let tempPermissionIds: number[] = [];
			user.roleIds.forEach(roleId => {
				const role = roles.find(r => r.id === roleId);
				if (role) {
					tempPermissionIds.push(...role.permissionIds!);
				}
			});
			tempPermissionIds = tempPermissionIds.filter(tp => tp > 0);
			tempPermissionIds = tempPermissionIds.filter(distinctFilter);
			const tempPermissions = permissions.filter(p => tempPermissionIds.some(tpi => tpi === p.id));
			setAssignedPermissions(tempPermissions);
		}
	}, [
		roles,
		permissions,
		user.roleIds
	]);

	useEffect(() => {
		if (user !== undefined) {
			setValue('firstName', user.firstName!);
			setValue('lastName', user.lastName!);
			setValue('emailAddress', user.email!);
			setValue('roleGroup', user.roleIds !== undefined ? user.roleIds.map(roleId => roleId.toString()) : []);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const generatePassword = (): string => {
		var longth = 8,
			allc = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			passgen = '';
		for (var i = 0; i < longth; i++) {
			passgen += allc[Math.floor(Math.random() * allc.length)];
		}
		return passgen + '@1';
	};

	const onUserDetailsSave = (formData: ITenantUserDetailsForm) => {
		setIsLoading(true);

		const newUser = {
			...user,
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.emailAddress, roleIds: formData.roleGroup.map(roleId => parseInt(roleId)),
			password: formData.password,
		};

		coreAPI.postTenantUser(newUser)
			.then(() => {
				navigate(`/admin/tenants/${tenantId}/users`);
				setIsLoading(false);
				toast.success('User successfully saved');
			});
	};

	const onUserDetailsDelete = () => {
		setIsLoading(true);
		coreAPI.deleteTenantUser({ userId: parseInt(userId!) || 0, tenantId: parseInt(tenantId!) || 0 })
			.then(() => {
				navigate(`/admin/tenants/${tenantId}/users`);
				setIsLoading(false);
				toast.success('User successfully deleted');
			});
	};

	const onCancelClick = () => {
		navigate(`/admin/tenants/${tenantId}/users`);
	};

	const openModal = () => {
		if (!showDeleteModal) {
			setShowDeleteModal(true);
		}
	};

	const closeModal = () => {
		setShowDeleteModal(false);
	};

	const distinctFilter = (value: any, index: number, self: Array<any>) => {
		return self.indexOf(value) === index;
	};

	return (
		<Page>
			<PageHero title="User Details" parentRoute={`/admin/tenants/${tenantId}/users`} />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<Controller
							control={control}
							name="firstName"
							rules={{ required: 'Enter first name' }}
							render={({ field, fieldState }) =>
								<FormGroup label="First Name" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="lastName"
							rules={{ required: 'Enter last name' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Last Name" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
					<div className="col-lg-3">
						<Controller
							control={control}
							name="emailAddress"
							rules={{ required: 'Enter email address' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Email address" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
					{userId && +userId !== -1 &&
						<div className="col-lg-3">
							<Controller
								control={control}
								name="password"
								render={({ field, fieldState }) =>
									<FormGroup label="Password" field={field} fieldState={fieldState}>
										<Input
											{...field}
											error={!!fieldState.error?.message}
										/>
										<Button
											className="btn-primary mt-2"
											disabled={isLoading}
											onClick={() => field.onChange(generatePassword())}
										>
											Generate password
										</Button>
									</FormGroup>
								}
							/>

						</div>
					}
				</div>
				<div className="row">
					<div className="col-lg-9">
						<Controller
							control={control}
							name="roleGroup"
							render={({ field, fieldState }) =>
								<FormGroup label="Role settings:" field={field} fieldState={fieldState}>
									<CheckboxGroup
										onChange={field.onChange}
										value={field.value}
										options={roleOptions}
										ref={null}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<label>Permissions user will have:</label>
						<div className="row">
							{assignedPermissions.map(permission => {
								return (
									<div key={permission.code} className="col-lg-4">
										{permission.name}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="mt-2">
					<Button
						className="btn-outline-primary me-2"
						onClick={onCancelClick}
					>
						Cancel
					</Button>
					<Button
						className="btn-primary me-2"
						disabled={isLoading}
						onClick={handleSubmit(onUserDetailsSave)}
					>
						Save
					</Button>
					{userId !== '-1' && (
						<Button
							className="btn-danger"
							disabled={isLoading}
							onClick={openModal}
						>
							Delete
						</Button>
					)}
				</div>
			</div>
			<ModalOverlay
				isOpen={showDeleteModal}
				modalSize="lg"
				onRequestClose={closeModal}
				headerChildren="Confirm?"
				confirmButtonChildren="Confirm"
				cancelButtonChildren="Cancel"
				confirmButtonAction={() => {
					onUserDetailsDelete();
				}}
				cancelButtonAction={() => {
					closeModal();
				}}
			>
				Are you sure you want to delete this account?
			</ModalOverlay>
		</Page>
	);
};

export default UserDetails;