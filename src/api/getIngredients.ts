import APIURLS from'./apiUrls';
import fetchJSON from './fetchJSON';
import { Ingredients } from './interfaces/ingredients';

export interface IIngredientsData {
	id: string,
	name: string,
	iconId: string
}


const fetchIngredients = async ():Promise<IIngredientsData[]> => {
	let ingredients = fetchJSON<Ingredients>(APIURLS.ingredients).then(data => {
		try {
			let ingredients = data.data.map(ingredient => {
				return {
					id: ingredient.id,
					name: ingredient.attributes.title,
					iconId: ingredient.relationships.field_ikona.data.id
				};
			});
			if (ingredients.length === 0) {
				throw 'Ingredients empty!';
			}
			return ingredients;
		} catch (error) {
			console.error('Invalid ingredients list, check API!', error);
		}
	});

	return ingredients;
};
export default fetchIngredients;
