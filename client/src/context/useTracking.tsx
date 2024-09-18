import React from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { emitAppHistoryEvent } from 'screens/feedback/useAppHistoryTracker';

type ReactGAOptions = Parameters<typeof ReactGA.initialize>[1];

export default function TrackerWrapper(props: React.PropsWithChildren<{}>) {
	const tracking_id = import.meta.env.VITE_ANALYTICS_TRACKING_ID;
	const location = useLocation();
	const isLocalHost = window.location.hostname === 'localhost';

	const options: ReactGAOptions = {
		testMode: isLocalHost,
	};

	React.useEffect(() => {
		if (tracking_id && tracking_id.includes('G-')) {
			ReactGA.initialize(tracking_id, options);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		emitAppHistoryEvent(location.pathname);
		trackPage(location.pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const trackPage = (page: string) => {
		if (!isLocalHost) {
			ReactGA.send({ hitType: 'pageview', page: page });
		}
	};

	return (
		<React.Fragment>
			{props.children}
		</React.Fragment>
	);
}
