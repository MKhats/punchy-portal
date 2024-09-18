import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthorizationWrapper from 'auth/AuthorizationWrapper';
import { Permissions } from 'auth/Permissions';
import classNames from 'classnames';

interface IProps {
	title: string;
	showMenuAdmin: boolean;
	setShowMenuAdmin: (v: boolean) => void;
}

const AdminMenuItems = (props: IProps) => {
	const menu = (
		<ul className={classNames('dropdown-menu', props.showMenuAdmin && 'show')}>
			<AuthorizationWrapper type="hide" permissions={[Permissions.ReadTenant, Permissions.WriteTenant]}>
				<li>
					<NavLink className="dropdown-item" to="/admin/tenants" onClick={() => props.setShowMenuAdmin(false)}>
						<span>Tenants</span>
					</NavLink>
				</li>
			</AuthorizationWrapper>
			<AuthorizationWrapper type="hide" permissions={[Permissions.ReadRole, Permissions.WriteRole]}>
				<li>
					<NavLink className="dropdown-item" to="/admin/roles" onClick={() => props.setShowMenuAdmin(false)}>
						<span>Roles</span>
					</NavLink>
				</li>
			</AuthorizationWrapper>
			<AuthorizationWrapper type="hide" permissions={[Permissions.ReadPickList, Permissions.WritePickList]}>
				<li>
					<NavLink className="dropdown-item" to="/pick-lists" onClick={() => props.setShowMenuAdmin(false)}>
						<span>Pick lists</span>
					</NavLink>
				</li>
			</AuthorizationWrapper>
			<AuthorizationWrapper type="hide" permissions={[Permissions.ReadPickList, Permissions.WritePickList]}>
				<li>
					<NavLink className="dropdown-item" to="/feedback/feedbackList" onClick={() => props.setShowMenuAdmin(false)}>
						<span>Feedback list</span>
					</NavLink>
				</li>
			</AuthorizationWrapper>
		</ul>
	);

	return (
		<div className="dropdown">
			<li className={classNames('nav-link dropdown-toggle', props.showMenuAdmin && 'show')} onClick={() => props.setShowMenuAdmin(!props.showMenuAdmin)}>
				{props.title}
			</li>
			{menu}
		</div>
	);

};

export default AdminMenuItems;