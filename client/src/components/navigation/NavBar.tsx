import React from 'react';
import { Link } from 'react-router-dom';
import AdminMenuItems from './AdminMenuItems';
import classNames from 'classnames';
import { AuthContext } from 'context/AuthContext';
import { Button } from 'components/core';
import { Permissions } from 'auth/Permissions';
import AuthorizationWrapper from 'auth/AuthorizationWrapper';
import { hasAnyRequiredPermission } from 'auth/Permissions';
import { IconMenu } from 'assets/icons';
import CoreMenuItems from './CoreMenuItems';
import logo from 'assets/images/punchcard-nav-logo.png';
import { useMsal } from '@azure/msal-react';

interface IProps {
	className?: string;
}

const NavBar = (props: IProps) => {
	const [showMenu, setShowMenu] = React.useState(false);
	const [showMenuAdmin, setShowMenuAdmin] = React.useState(false);
	const { currentUser } = React.useContext(AuthContext);
	const hasAdminPermissions = hasAnyRequiredPermission(
		currentUser.permissions,
		[Permissions.ReadTenant, Permissions.ReadPickList, Permissions.ReadRole]
	);

	React.useEffect(() => {
		if (showMenu === true) {
			document.body.classList.add('nav-open');
		} else {
			document.body.classList.remove('nav-open');
		}
	}, [showMenu]);

	const { instance } = useMsal();

	return (
		<React.Fragment>
			<nav
				className={classNames(
					'bg-dark',
					'navbar navbar-expand-lg navbar-dark shadow',
					props.className
				)}
			>
				<div className="container-fluid">
					<Link to="/" className="navbar-brand">
						{/* <img src={logo} alt="Punchcard" className="py-3" />
						{hasAdminPermissions && <span>&nbsp; <IconMenu /></span>} */}
						<div className="pt-3">
							<h2>Punchy Portal</h2>
						</div>
					</Link>
					<div
						className={classNames('navbar-collapse bg-dark', {
							collapse: !showMenu,
						})}
					>
						<ul className={classNames('navbar-nav ms-lg-auto')}>
							<li className="nav-item-heading d-lg-none">
								<hr className="border-light disabled" />
							</li>
							<li className="nav-item">
								<Link to="/settings/profile">
									<strong className="nav-link disable-pointer-events">
										Profile
									</strong>
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/feedback">
									<span> Feedback</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/AzureADB2C/Account/SignOut"
									// Need this to bypass the router.
									onClick={() => instance.logoutRedirect()}
								>
									<span>Log out</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
};

// export default withRouter(NavBar);
export default NavBar;
