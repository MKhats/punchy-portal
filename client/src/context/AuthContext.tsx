import React, { useContext } from 'react';
import { LoadingPage } from 'components/core';
import { AuthenticatedTemplate, MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import axios from 'axios';
import authAPI from 'api/authApi';
import { AccountInfo, IPublicClientApplication, InteractionType } from '@azure/msal-browser';
import { SettingsContext } from 'context/SettingsContext';

type IAuthContext = {
	currentUser: CurrentUserDTO,
	isInitializing: boolean,
};


const AuthProvider = (props: React.PropsWithChildren) => {
	const [currentUser, setCurrentUser] = React.useState({} as CurrentUserDTO);
	const [isInitializing, setIsInitializing] = React.useState(true);

	const { accounts, instance } = useMsal();
	const { settings } = useContext(SettingsContext);


	React.useEffect(() => {
		const init = async () => {
			if (accounts.length === 1) {
				await getToken(instance, accounts, settings.b2CApiScopes);
				await refreshUser();
				setIsInitializing(false);
			}
		};

		init();

	}, [accounts, instance, settings?.b2CApiScopes]);

	React.useEffect(() => {
		// interceptor to get new token on a 401, then retry the request.
		axios.interceptors.response.use(
			response => response,
			async (error: any) => {
				const originalConfig = error.config;
				if (error.response) {
					if (error.response.status === 401 && !originalConfig._retry) {
						originalConfig._retry = true; // don't retry, avoid infinite loop.
						const token = await getToken(instance, accounts, settings?.b2CApiScopes!, true);
						originalConfig.headers.Authorization = `Bearer ${token}`;
						return axios.request(originalConfig);
					}
					else {
						return Promise.reject(error);
					}
				}
				else {
					console.error(error);
					return error;
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [axios]);

	const refreshUser = async () => {
		const user = await authAPI.getCurrentUser();
		setCurrentUser(user);
		return true;
	};

	const getToken = async (instance: IPublicClientApplication, accounts: AccountInfo[], scopes: string[], forceRefresh: boolean = false) => {
		const token = await instance.acquireTokenSilent({ scopes: scopes, account: accounts[0], forceRefresh: forceRefresh });
		axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
		return token.accessToken;
	};

	return (
		<MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
			<AuthenticatedTemplate>
				<AuthContext.Provider value={{
					currentUser,
					isInitializing,
				}}>
					{isInitializing ? <LoadingPage /> : props.children}
				</AuthContext.Provider>
			</AuthenticatedTemplate>
		</MsalAuthenticationTemplate>
	);
};

export default AuthProvider;
export const AuthContext = React.createContext({} as IAuthContext);
