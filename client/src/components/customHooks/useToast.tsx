import React from 'react';
import { ToastContainer, toast, ToastContent, ToastOptions } from 'react-toastify';

export interface IToast {
	message: (content: ToastContent, options?: ToastOptions) => void;
	warn: (content: ToastContent, options?: ToastOptions) => void;
	error: (content: ToastContent, options?: ToastOptions) => void;
	success: (content: ToastContent, options?: ToastOptions) => void;
	info: (content: ToastContent, options?: ToastOptions) => void;
}

const ToastContext = React.createContext<IToast>({
	message: (_content: ToastContent, _options?: ToastOptions) => undefined,
	warn: (_content: ToastContent, _options?: ToastOptions) => undefined,
	error: (_content: ToastContent, _options?: ToastOptions) => undefined,
	info: (_content: ToastContent, _options?: ToastOptions) => undefined,
	success: (_content: ToastContent, _options?: ToastOptions) => undefined,
});

export const ToastProvider = (props: any) => {
	const error = toast.error;
	const warn = toast.warn;
	const success = toast.success;
	const info = toast.info;
	const message = toast;
	return (
		<ToastContext.Provider value={{message, error, warn, success, info}}>
			{props.children}
			<ToastContainer />
		</ToastContext.Provider>
	);
};

export const useToast = () => React.useContext(ToastContext);

