import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPICategories } from './interfaces/categories';
import addAPIParameters, { TIdsOrAll } from './parameters';

export interface ICategoriesData {
	id: string,
	name: string,
	urlSlug: string
	roomIds: string[],
	textBlockIds: string[]
	partialMatch: boolean
}


const fetchCategories = async (
	ids: TIdsOrAll
): Promise<ICategoriesData[]> => {
	const dataObject = await fetchJSON<IAPICategories>(
		APIURLS.categories + addAPIParameters({
			specificIds: ids
		})
	);
	let categories = dataObject.data.map(category => {
		return {
			id: category.id,
			name: category.attributes.title,
			urlSlug: category.attributes.field_urlslug,
			roomIds: category.relationships.field_pokoje.data.map(data => data.id),
			textBlockIds: category.relationships.field_bloki.data.map(data => data.id),
			partialMatch: category.attributes.field_exact_match
		};
	});
	if (categories.length === 0) {
		throw 'Category list empty!';
	}
	return categories;
};

export default fetchCategories;
