import React from 'react';
import { Page, Button, PageHero, } from 'components/core';
import { useToast } from 'components/customHooks/useToast';

const ToastExamplePage = () => {
	const toast = useToast();

	return(
		<Page title="Toast Example">
			<PageHero title="Toast Example" />
			<div className="container-fluid">
				<div className="row mb-3">
					<div className="col-lg-3">
						<Button className="btn-success" onClick={() => toast.success('This is a Success toastr message')}>Success Message</Button>
					</div>
					<div className="col-lg-3">
						<Button className="btn-danger" onClick={() => toast.error('This is a error toastr message')}>Error Message</Button>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3">
						<Button className="btn-warning" onClick={() => toast.warn('This is a warning toastr message')}>Warning Message</Button>
					</div>
					<div className="col-lg-3">
						<Button className="btn-info" onClick={() => toast.info('This is a info toastr message')}>Info Message</Button>
					</div>
				</div>
			</div>

		</Page>
	);
};

export default ToastExamplePage;