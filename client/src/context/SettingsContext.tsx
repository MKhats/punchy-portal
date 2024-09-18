import React from 'react';
import { LoadingPage } from 'components/core';
import settingsApi from 'api/settingsApi';
import axios from 'axios';

type IWebSettingsContext = {
	settings: WebSettings;
}


const SettingsProvider = (props: any) => {
	const [settings, setSettings] = React.useState<WebSettings | null>(null);

	React.useEffect(() => {
		axios.defaults.baseURL = import.meta.env.VITE_API_URL;
		const getData = async () => {
			// attempt to get settings form session storage first.
			var storedSettings = sessionStorage.getItem('punchcard.core.settings');
			if (storedSettings) {
				setSettings(JSON.parse(storedSettings));
				return;
			}
			// if not in session storage, get from api.
			const settings = await settingsApi.getSettings();
			setSettings(settings);
			sessionStorage.setItem('punchcard.core.settings', JSON.stringify(settings));
		};

		settings === null && getData();
	}, []);

	return (
		<SettingsContext.Provider value={{ settings: settings ?? {} as WebSettings }}>
			{settings === null ?
				<LoadingPage />
				: props.children
			}
		</SettingsContext.Provider>
	);
};
export default SettingsProvider;
export const SettingsContext = React.createContext<IWebSettingsContext>({} as IWebSettingsContext);

