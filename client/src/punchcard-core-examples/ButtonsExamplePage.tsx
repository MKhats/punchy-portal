import React from 'react';
import { Button, PageHero, Page } from 'components/core';
import { IconChevronRight } from 'assets/icons';

const ButtonsExamplePage = () => {

	// btn btn icon overrides Iconbutton background color and makes it transparent
	return (
		<Page title="Buttons example page">
			<PageHero title="Button Examples" />
			<div className="container-fluid">
				<h2 className="mt-3">Primary buttons</h2>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-primary">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-primary" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-primary" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-primary">
									Default
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-primary" disabled={true}>
									Disabled
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-primary" loading={true}>
									Loading
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-primary">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-primary" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-primary" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-primary">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-primary" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-primary" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<h2 className="mt-4">Secondary buttons</h2>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-secondary">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-secondary" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-secondary" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-secondary">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-secondary" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-secondary" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-secondary">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-secondary" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-secondary" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-secondary">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-secondary" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-secondary" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<h2 className="mt-4">Success buttons</h2>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-success">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-success" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-success" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-success">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-success" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-success" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-success">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-success" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-success" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-success">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-success" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-success" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<h2 className="mt-4">Danger buttons</h2>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-danger">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-danger" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-danger" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-danger">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-danger" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-danger" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-danger">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-danger" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-danger" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-danger">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-danger" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-danger" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<h2 className="mt-4">Info buttons</h2>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-info">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-info" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-info" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-info">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-info" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-info" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-info">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-info" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-info" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-info">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-info" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-info" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<h2 className="mt-4">Warning buttons</h2>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-warning">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-warning" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-warning" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Contained buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-warning">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-warning" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-warning" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-warning">Default</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-warning" disabled={true}>Disabled</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-warning" loading={true}>Loading</Button>
						</span>
					</div>
					<div className="col-lg-6 mb-3">
						<h3 className="h6">Outlined buttons with icon</h3>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-warning">
								<span className="me-2">Default</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-warning" disabled={true}>
								<span className="me-2">Disabled</span>
								<IconChevronRight />
							</Button>
						</span>
						<span className="d-inline-block me-2 mb-2">
							<Button className="btn-outline-warning" loading={true}>
								<span className="me-2">Loading</span>
								<IconChevronRight />
							</Button>
						</span>
					</div>
				</div>
			</div>
		</Page>
	);

};

export default ButtonsExamplePage;