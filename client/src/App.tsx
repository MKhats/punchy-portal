import React from 'react';
import PickListProvider from './context/PickListContext';
import AuthProvider from './context/AuthContext';
import { SettingsContext } from './context/SettingsContext';
import { MsalProvider } from '@azure/msal-react';
import AppNavigator from './AppNavigator';
import { ToastProvider } from './components/customHooks/useToast';
import { PublicClientApplication } from '@azure/msal-browser';


const App = () => {
	const { settings } = React.useContext(SettingsContext);

	const msalInstance = new PublicClientApplication({
		auth: {
			clientId: settings.b2CClientId,
			authority: settings.b2CSignInPolicyURL,
			knownAuthorities: settings.b2CKnownAuthorities,
			redirectUri: window.location.origin,
		},
		cache: {
			cacheLocation: 'sessionStorage',
			storeAuthStateInCookie: false,
		},
	});

	return (
		<MsalProvider instance={msalInstance}>
			<ToastProvider>
				<AuthProvider>
					<PickListProvider>
						<AppNavigator />
					</PickListProvider>
				</AuthProvider>
			</ToastProvider>
		</MsalProvider>
	);
};


export default App;
