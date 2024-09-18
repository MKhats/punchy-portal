import React from 'react';

import { AuthContext } from 'context/AuthContext';
import { hasAnyRequiredPermission, hasAllRequiredPermissions } from './Permissions';

type AuthWrapperType = 'hide' | 'disable';

interface IProps {
	children?: any;
	permissions: string[];
	type: AuthWrapperType;
	requireAllPermissions?: boolean;
}

const AuthorizationWrapper = (props: IProps) => {
	return (
		<AuthContext.Consumer>
			{({ currentUser }) => {
				if (props.type === 'hide') {
					if (props.requireAllPermissions) {
						return hasAllRequiredPermissions(currentUser.permissions!, props.permissions) ?
							React.cloneElement(props.children) : null;
					} else {
						return hasAnyRequiredPermission(currentUser.permissions!, props.permissions) ?
							React.cloneElement(props.children) : null;
					}
				}
				else if (props.type === 'disable') {
					if (props.requireAllPermissions) {
						return hasAllRequiredPermissions(currentUser.permissions!, props.permissions) ?
							React.cloneElement(props.children) :
							React.cloneElement(props.children, { disabled: true });
					} else {
						return hasAnyRequiredPermission(currentUser.permissions!, props.permissions) ?
							React.cloneElement(props.children) :
							React.cloneElement(props.children, { disabled: true });
					}
				} else {
					return null;
				}
			}}
		</AuthContext.Consumer>
	);
};

export default AuthorizationWrapper;