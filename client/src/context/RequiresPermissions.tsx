import React from 'react';
import { AuthContext } from 'context/AuthContext';
import { hasAnyRequiredPermission } from 'auth/Permissions';
import FourOhFourPage from 'screens/404Page';

interface IProps {
	requiredPermissions: string[]
}

const RequiresPermissions = (props: React.PropsWithChildren<IProps>) => {
	const AuthCxt = React.useContext(AuthContext);
	const { currentUser } = AuthCxt;
	if (hasAnyRequiredPermission(currentUser.permissions!, props.requiredPermissions)) {
		return <React.Fragment>{props.children}</React.Fragment>;
	}
	else {
		return <React.Fragment>{props.children}</React.Fragment>;
		//return <FourOhFourPage />;
	}
};

export default RequiresPermissions;