import React from 'react';

const PageFooter = () => {
	return (
		<footer className="container-fluid no-print">
			<p className="text-muted">Core v{import.meta.env.VITE_Core_Version},</p>
		</footer>
	);
};

export default PageFooter;
