import React from 'react';
import { Page, PageHero, Button, CheckboxGroup, Input, FormGroup, TextArea } from 'components/core';
import { useParams, useNavigate } from 'react-router-dom';
import coreAPI from 'api/coreAPI';
import useEffectAsync from 'components/customHooks/useEffectAsync';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from 'components/customHooks/useToast';


interface IRoleForm {
	name: string;
	description: string;
	permissionsGroup: string[];
}

const RoleDetailsPage = () => {
	const { roleId } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	const [role, setRole] = React.useState<RoleDTO>();
	const [permissions, setPermissions] = React.useState<PermissionDTO[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const { handleSubmit, control, setValue } = useForm<IRoleForm>({
		defaultValues: {
			name: '',
			description: '',
			permissionsGroup: [],
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const permissionOptions = permissions.map((permission) => {
		return { label: permission.name!, value: permission.id!.toString() };
	});

	useEffectAsync(async (isMounted: any) => {
		setIsLoading(true);
		const permissions = await coreAPI.getPermissions();
		if (roleId && +roleId !== -1) {
			const role = await coreAPI.getRole({ id: +roleId });
			if (isMounted()) {
				setRole(role);
			}
		}
		if (isMounted()) {
			setPermissions(permissions);
			setIsLoading(false);
		}
	});

	React.useEffect(() => {
		if (permissions !== undefined && permissions.length > 0 && role !== undefined) {
			setValue('name', role.name !== undefined ? role.name : '');
			setValue('description', role.description !== undefined ? role.description : '');
			const permissionsGroupDefaultValues = permissions.filter(permission => assignedPermissionMapping(permission))
				.map(permission => permission.id!.toString());
			setValue('permissionsGroup', permissionsGroupDefaultValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [permissions]);

	function assignedPermissionMapping(permission: PermissionDTO) {
		return role && role.permissionIds && role.permissionIds.some(id => id === permission.id);
	}

	async function onRoleSave(roleData: IRoleForm) {
		setIsLoading(true);

		const permissionIdsSelected: number[] = roleData.permissionsGroup.map(permissionIdSelected => parseInt(permissionIdSelected));

		const updatedRole: PostRoleRequest = {
			id: role?.id,
			name: roleData.name,
			description: roleData.description,
			permissionIds: permissionIdsSelected,
		};

		const updatedRoleAfterPost = await coreAPI.postRole(updatedRole);
		setRole(updatedRoleAfterPost);
		setIsLoading(false);
		toast.success('Role updated');
	}


	function onCancelClick() {
		navigate('/admin/roles');
	}

	return (
		<Page>
			<PageHero title="Role Details" parentRoute="/admin/roles" />
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<Controller
							control={control}
							name="name"
							rules={{ required: 'Name is required' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Name" field={field} fieldState={fieldState}>
									<Input
										{...field}
										error={!!fieldState.error?.message}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3">
						<Controller
							control={control}
							name="description"
							rules={{ required: 'Description is required' }}
							render={({ field, fieldState }) =>
								<FormGroup label="Description" field={field} fieldState={fieldState}>
									<TextArea
										{...field}
										error={!!fieldState.error?.message}
										ref={null}
									/>
								</FormGroup>
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-9">
						<Controller
							control={control}
							name="permissionsGroup"
							render={({ field, fieldState }) =>
								<FormGroup label="Description" field={field} fieldState={fieldState}>
									<CheckboxGroup
										onChange={field.onChange}
										value={field.value}
										options={permissionOptions}
										ref={null}
									/>
								</FormGroup>
							}
						/>
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
						className="btn-primary"
						disabled={isLoading}
						onClick={handleSubmit(onRoleSave)}
					>
						Save
					</Button>
				</div>
			</div>
		</Page>
	);
};

export default RoleDetailsPage;
