import APIURLS from './apiUrls';
import fetchExperiments, { IExperimentsData } from './fetchExperiments';
import fetchIngredients, { IIngredientsData } from './fetchIngredients';
import { TIdsOrAll } from './parameters';

type UrlTypes = keyof typeof APIURLS;

const resolveAPICall = async (
	urlType: UrlTypes,
	ids: TIdsOrAll
): Promise<IExperimentsData[] | IIngredientsData[]> => {
	switch (urlType) {
		case 'experiments':
			return fetchExperiments(ids);
		case 'ingredients':
			return fetchIngredients(ids);
		default:
			break;
	}
};

export default resolveAPICall;

