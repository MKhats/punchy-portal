import React from 'react';
import { useToast } from 'components/customHooks/useToast';


type IsMounted = () => boolean;
type Effect = (isMounted: IsMounted) => Promise<any>;

const useEffectAsync = (effect: Effect) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const memoizedEffect = React.useCallback(effect, []);
	const toast = useToast();

	React.useEffect(() => {

		let mounted: boolean = true;

		const isMounted: IsMounted = () => mounted;

		try {
			memoizedEffect(isMounted);
		} catch (error) {
			const { message: msg } = error && error.response && error.response.data;
			if (msg) {
				toast.error(msg);
			}
		}

		return () => {
			mounted = false;
		};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [memoizedEffect]);

};

export default useEffectAsync;