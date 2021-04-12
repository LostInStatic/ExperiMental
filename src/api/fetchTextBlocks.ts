import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPITextBlocks } from './interfaces/textBlocks';
import addAPIParameters, { TIdsOrAll } from './parameters';

export interface ITextBlockData {
	id: string,
	name: string,
	content: string,
	order: number
}

const fetchTextBlocks = async (
	ids: TIdsOrAll
): Promise<ITextBlockData[]> => {
	const url = APIURLS.textBlocks + addAPIParameters({
		specificIds: ids || undefined
	});
	const dataObject = await fetchJSON<IAPITextBlocks>(url);
	const textBlocks = dataObject.data.map(
		(textBlock): ITextBlockData => {
			return {
				id: textBlock.id,
				name: textBlock.attributes.title,
				content: textBlock.attributes.field_content.processed,
				order: textBlock.attributes.field_kolejnosc
			};
		});
	return textBlocks.sort((a, b) => b.order - a.order);

};

export default fetchTextBlocks;


const handleError = (error: any, URL: string): void => {
	console.error(`There has been a problem with fetching text blocks.\nURL: ${URL}\nError: ${error}`);
};