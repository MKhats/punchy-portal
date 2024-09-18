import React from 'react';
import { Page, PageFooter, PageHero } from 'components/core';
import NavBar from 'components/navigation/NavBar';

const FourOhFourPage = () => {
	return (
		<Page title="404">
			<NavBar />
			<PageHero title="404" />
			<div className="container-fluid">
				<h2>Page not found</h2>
				<p className="mt-4">Sorry, I'm not sure how you got here but this place doesn't exist.</p>
			</div>
			<PageFooter />
		</Page>
	);
};

export default FourOhFourPage;
