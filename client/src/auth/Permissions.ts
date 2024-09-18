export enum Permissions {
	ReadTenant = 'ReadTenant',
	WriteTenant = 'WriteTenant',
	ReadRole = 'ReadRole',
	WriteRole = 'WriteRole',
	ReadPickList = 'ReadPickList',
	WritePickList = 'WritePickList',
	ReadUser = 'ReadUser',
	WriteUser = 'WriteUser',
	ReadWidget = 'ReadWidget',
	WriteWidget = 'WriteWidget'
}

export const hasAnyRequiredPermission = (currentPermissions = [] as string[], requiredPermissions = []  as string[]) => {
	return currentPermissions.find((p) => requiredPermissions.includes(p)) !== undefined;
};

export const hasAllRequiredPermissions = (currentPermissions = [] as string[], requiredPermissions = [] as string[]) => {
	return requiredPermissions.every(p => currentPermissions.includes(p));
};