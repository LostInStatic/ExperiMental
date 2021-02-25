import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPIIngredients } from './interfaces/ingredients';
import addAPIParameters, { TIdsOrAll } from './parameters';

export interface IIngredientsData {
	id: string,
	name: string,
	iconUrls: {
		color?: string,
		mono?: string
	}
}

const fetchIngredients = async (
	ids: TIdsOrAll
): Promise<IIngredientsData[]> => {
	const url = APIURLS.ingredients + addAPIParameters({
		includeIcons: true,
		specificIds: ids || undefined
	});
	try {
		const dataObject = await fetchJSON<IAPIIngredients>(url);
		let ingredients = dataObject.data.map(
			(ingredient): IIngredientsData => {
				return {
					id: ingredient.id,
					name: ingredient.title,
					iconUrls: {
						color: ingredient?.field_ikona?.uri?.url,
						mono: ingredient?.field_ikona_mono?.uri?.url
					}
				};
			});
		return ingredients;

	} catch (error) {
		handleError(error, url);
	}


};

export default fetchIngredients;


const handleError = (error: any, URL: string): Response => {
	console.error(`There has been a problem with fetching ingredients.\nURL: ${URL}\nError: ${error}`);
	return new Response(JSON.stringify({}));
};