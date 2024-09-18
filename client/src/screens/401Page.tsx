import React from 'react';
import { Page, PageHero } from 'components/core';

const FourOhOnePage = () => {

	return (
		<Page title="401">
			<PageHero title="401" />
			<div className="container-fluid">
				<h2>Unauthorized</h2>
				<p className="mt-4">Sorry, you do not have access.</p>
			</div>
		</Page>
	);
};

export default FourOhOnePage;
