import React = require('react');
import fetchCategories, { ICategoriesData } from '../api/fetchCategories';
import fetchExperiments, { IExperimentsData } from '../api/fetchExperiments';
import fetchIngredients, { IIngredientsData } from '../api/fetchIngredients';
import fetchRooms, { IRoomsData } from '../api/fetchRooms';
import fetchTextBlocks, { ITextBlockData } from '../api/fetchTextBlocks';
import { TIdsOrAll } from '../api/parameters';
import Ingredient from './ingredients/ingredient';

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
	categories: TEntityState<ICategoriesData[]>
}

export type TContextValue = {
	state: TProviderState
	request: {
		experiments: (ids: TIdsOrAll) => void
		ingredients: (ids: TIdsOrAll) => void
		rooms: (ids: TIdsOrAll) => void
		textBlocks: (ids: TIdsOrAll) => void
		categories: (ids: TIdsOrAll) => void
	}
}

const Context = React.createContext<TContextValue>(null);

export const useData = (): TContextValue => {
	const contextState = React.useContext(Context);
	if (contextState === null) {
		throw new Error('useData must be used within a DataProvider component');
	}
	return contextState;
};

export const DataProvider: React.FC = (props) => {
	const [state, updateState] = React.useReducer(
		updateData,
		{
			experiments: { status: 'loaded', data: [] },
			ingredients: { status: 'loaded', data: [] },
			rooms: { status: 'loaded', data: [] },
			textBlocks: { status: 'loaded', data: [] },
			categories: { status: 'loaded', data: [] }
		});

	return (
		<Context.Provider value={{ state: state, request: generateRequestFunctions(updateState) }}>
			{props.children}
		</Context.Provider>
	);
};

const updateData = (state: TProviderState, update: Partial<TProviderState>) => {
	return { ...state, ...update };
};

const resolveRequest = ( //todo-could be better
	ids: TIdsOrAll,
	updateState: (state: TEntityState<any>) => void,
	fetchData: (ids: TIdsOrAll) => Promise<any>
) => {
	updateState({ status: 'loading', data: [] });
	fetchData(ids).then(
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
				data: []
			});
		}
	);
};

const generateRequestFunctions = (
	updateState: (state: Partial<TProviderState>) => void
) => {
	return {
		experiments: ids => resolveRequest(ids, state => updateState({ experiments: state }), fetchExperiments),
		ingredients: ids => resolveRequest(ids, state => updateState({ ingredients: state }), fetchIngredients),
		rooms: ids => resolveRequest(ids, state => updateState({ rooms: state }), fetchRooms),
		textBlocks: ids => resolveRequest(ids, state => updateState({ textBlocks: state }), fetchTextBlocks),
		categories: ids => resolveRequest(ids, state => updateState({ categories: state }), fetchCategories),
	};
};
