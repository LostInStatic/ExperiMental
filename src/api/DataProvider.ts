import fetchExperiments, { IExperimentsData } from './fetchExperiments';
import fetchIngredients, { IIngredientsData } from './fetchIngredients';
import fetchRooms, { IRoomsData } from './fetchRooms';
import { TIdsOrAll } from './parameters';

type Data = {
	experiments: Promise<IExperimentsData[]>,
	ingredients: Promise<IIngredientsData[]>,
	rooms: Promise<IRoomsData[]>
}

type DataKey = keyof Data

export default class DataProvider {
	private isFetching: boolean
	private data: Data

	constructor() {
		this.isFetching = false;
	}

	fetch = async (dataKey: DataKey, ids:TIdsOrAll) => {
		this.isFetching = true;
		switch (dataKey) {
			case 'ingredients':
				this.data[dataKey] = fetchIngredients(ids);
				break;
			case 'experiments':
				this.data[dataKey] = fetchExperiments(ids);
				break;
			case 'rooms':
				this.data[dataKey] = fetchRooms(ids);
				break;

			default:
				break;
		}
		Promise.all([Object.values(this.data)]).then(() => this.isFetching = false);
		console.log(this.data);
		return this.data[dataKey];
	}
}