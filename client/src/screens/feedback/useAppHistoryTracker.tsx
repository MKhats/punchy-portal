import React, { PropsWithChildren } from 'react';
import { eventEmitter } from 'AppNavigator';

const MAX_HISTORY_SIZE = 15;

export const emitAppHistoryEvent = (page: string) => {
	eventEmitter.emit('history', page);
};

export default function AppHistoryTrackerProvider(props: PropsWithChildren<{}>) {
	const historyQueueRef = React.useRef<string[]>([]);
	React.useEffect(() => {
		eventEmitter.on('history', (text: string) => {
			const queue = historyQueueRef.current || [];
			if (queue.length === MAX_HISTORY_SIZE) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const [_first, ...restQueue] = queue;
				historyQueueRef.current = [...restQueue, text];
			} else {
				historyQueueRef.current = [...queue, text];
			}
		});
	}, []);

	return (
		<AppHistoryTrackerContext.Provider value={{ historyQueueRef }}>
			{props.children}
		</AppHistoryTrackerContext.Provider>
	);
}

const DEFAULT_CONTEXT = {
	historyQueueRef: { current: [] as string[] },
};
const AppHistoryTrackerContext = React.createContext(DEFAULT_CONTEXT);
export const useAppHistoryTrackerContext = () => React.useContext(AppHistoryTrackerContext);
