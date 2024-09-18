import React from 'react';
import { Page, PageHero } from 'components/core';
import { AuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
	const { currentUser } = React.useContext(AuthContext);

	return (
		<Page title="Your Profile">
			<PageHero title="Your Profile">
			</PageHero>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<div className="d-flex justify-content-between">
							<h5>Personal Information</h5>
							<Link
								to="/settings/update-info"
							>
								Edit
							</Link>
						</div>
						<ol className="list-group">
							<li className="list-group-item bg-light border-grey-200 py-3">
								<div className="fw-bold">Name</div>
								<p className="mb-0">{currentUser.firstName} {currentUser.lastName}</p>
							</li>
							<li className="list-group-item bg-light border-grey-200 py-3">
								<div className="fw-bold">Email</div>
								<p className="mb-0">{currentUser.email}</p>
							</li>
						</ol>

						<div className="pt-4">
							<h5>Security</h5>
						</div>
						<ol className="list-group">
							<li className="list-group-item bg-light border-grey-200 py-3">
								<div className="d-flex justify-content-between">
									<div>
										<div className="fw-bold">Password</div>
										<p className="mb-0">****</p>
									</div>
									<Link
										to="/settings/update-password"
									>
										Edit
									</Link>
								</div>
							</li>
						</ol>
					</div>
				</div>
			</div>
		</Page >
	);

};

export default UserProfile;
