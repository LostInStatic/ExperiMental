import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPITextBlocks } from './interfaces/textBlocks';
import addAPIParameters, { TIdsOrAll } from './parameters';

export interface ITextBlockData {
	id: string,
	anchor: string,
	name: string,
	content: string
}

const fetchTextBlocks = async (
	ids: TIdsOrAll
): Promise<ITextBlockData[]> => {
	const url = APIURLS.textBlocks + addAPIParameters({
		specificIds: ids || undefined
	});
	try {
		const dataObject = await fetchJSON<IAPITextBlocks>(url);
		let textBlocks = dataObject.data.map(
			(textBlock): ITextBlockData => {
				return {
					id: textBlock.id,
					anchor: textBlock.attributes.field_anchor,
					name: textBlock.attributes.title,
					content: textBlock.attributes.field_content.processed	
				};
			});
		return textBlocks;

	} catch (error) {
		handleError(error, url);
	}


};

export default fetchTextBlocks;


const handleError = (error: any, URL: string): Response => {
	console.error(`There has been a problem with fetching text blocks.\nURL: ${URL}\nError: ${error}`);
	return new Response(JSON.stringify({}));
};