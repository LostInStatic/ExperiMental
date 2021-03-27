import React = require('react');
import fetchExperiments, { IExperimentsData } from '../api/fetchExperiments';
import fetchIngredients, { IIngredientsData } from '../api/fetchIngredients';
import fetchRooms, { IRoomsData } from '../api/fetchRooms';
import fetchTextBlocks, { ITextBlockData } from '../api/fetchTextBlocks';
import { TIdsOrAll } from '../api/parameters';

export type TFetchStatus = 'loaded' | 'loading' | 'error'

type TEntityState<T> = {
	data: T
	status: TFetchStatus
}

type TProviderState = {
	experiments: TEntityState<IExperimentsData[]>
	ingredients: TEntityState<IIngredientsData[]>
	rooms: TEntityState<IRoomsData[]>
	textBlocks: TEntityState<ITextBlockData[]>
}

type TRequest = {
	experiments?: TIdsOrAll
	ingredients?: TIdsOrAll
	rooms?: TIdsOrAll
	textBlocks?: TIdsOrAll
}

export type TContextValue = {
	state: TProviderState
	request: (request: TRequest) => void
}

const Context = React.createContext<TContextValue>(null);

export const useData = (): TContextValue => {
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
	const [state, updateState] = React.useReducer(
		updateData,
		{
			experiments: { status: 'loaded', data: [] },
			ingredients: { status: 'loaded', data: [] },
			rooms: { status: 'loaded', data: [] },
			textBlocks: { status: 'loaded', data: [] }
		});

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
						ingredients: state
					});
				},
				() => fetchIngredients(request.ingredients)
			);
		}

		if (request.textBlocks) {
			resolveRequest(
				state => {
					updateState({
						textBlocks: state
					});
				},
				() => fetchIngredients(request.textBlocks)
			);
		}
	}, [request]);

	return (
		<Context.Provider value={{ state: state, request: updateRequest }}>
			{props.children}
		</Context.Provider>
	);
};

const updateData = (state: TProviderState, update: Partial<TProviderState>) => {
	return { ...state, ...update };
};

const resolveRequest = ( //todo-could be better
	updateState: (state: TEntityState<any>) => void,
	fetchData: () => Promise<any>
) => {
	updateState({ status: 'loading', data: null });
	fetchData().then(
		data => {
			updateState({
				status: 'loaded',
				data: data
			}
			);
		}

	).catch(
		error => {
			console.error(error);
			updateState({
				status: 'error',
				data: null
			});
		}
	);
};