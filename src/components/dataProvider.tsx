import React = require('react');
import fetchExperiments, { IExperimentsData } from '../api/fetchExperiments';
import fetchIngredients, { IIngredientsData } from '../api/fetchIngredients';
import fetchRooms, { IRoomsData } from '../api/fetchRooms';
import { TIdsOrAll } from '../api/parameters';

type TDataState<T> = {
	data?: T
	status: 'loaded' | 'loading' | 'error'
}

type TProviderState = {
	experiments?: TDataState<IExperimentsData[]>
	ingredients?: TDataState<IIngredientsData[]>
	rooms?: TDataState<IRoomsData[]>
	updateRequest: (request: TRequest) => void
}

type TRequest = {
	experiments?: TIdsOrAll
	ingredients?: TIdsOrAll
	rooms?: TIdsOrAll
}

const Context = React.createContext<TProviderState | null>(null);

export const useData = (): TProviderState => {
	const contextState = React.useContext(Context);
	if (contextState === null) {
		throw new Error('useItemData must be used within a ItemDataProvider tag');
	}
	return contextState;
};

export const DataProvider: React.FC<{
	initialRequest: TRequest
}> = (props) => {
	const [request, updateRequest] = React.useState(props.initialRequest);
	const [state, updateState] = React.useReducer(updateData, null);

	React.useEffect(() => {
		if (request.rooms) {
			resolveRequest(
				state => {
					updateState({
						rooms: state
					});
				},
				() => fetchRooms(request.rooms)
			);
		}
		if (request.experiments) {
			resolveRequest(
				state => {
					updateState({
						experiments: state
					});
				},
				() => fetchExperiments(request.experiments)
			);
		}
		if (request.ingredients) {
			resolveRequest(
				state => {
					updateState({
						rooms: state
					});
				},
				() => fetchIngredients(request.ingredients)
			);
		}
	}, [request]);

	return (
		<Context.Provider value={{ ...state, updateRequest }}>
			{props.children}
		</Context.Provider>
	);
};



const updateData = (state: TProviderState, update: Partial<TProviderState>) => {
	return { ...state, ...update };
};

const resolveRequest = (
	updateState: (state: TDataState<any>) => void,
	fetchData: () => Promise<any>
) => {
	updateState({ status: 'loading' });
	fetchData().then(
		data => {
			updateState({
				status: 'loaded',
				data: data
			}
			);
		}

	);
};