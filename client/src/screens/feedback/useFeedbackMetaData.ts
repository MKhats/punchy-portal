import platform from 'platform';

export const useFeedbackMetaData = () => {
	const browser = platform.name;
	const browserVersion = platform.version;
	const computerOs = platform.os?.family;
	const computerOsVersion = platform.os?.version;
	const language = navigator.language;

	return {
		browser,
		browserVersion,
		computerOs,
		computerOsVersion,
		language,
	};
};
