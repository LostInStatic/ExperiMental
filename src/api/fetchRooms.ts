import alterOutgoingLinks from './alterOutgoingLinks';
import APIURLS from './apiUrls';
import fetchJSON from './fetchJSON';
import { IAPIRooms } from './interfaces/rooms';
import addAPIParameters, { TIdsOrAll } from './parameters';

export interface IRoomsData {
	id: string,
	name: string,
	description,
	ingredientIds: string[],
	experimentIds: string[],
	order: number

}


const fetchRooms = async (
	ids: TIdsOrAll
): Promise<IRoomsData[]> => {
	const url = APIURLS.rooms + addAPIParameters({
		specificIds: ids
	});
	const dataObject = await fetchJSON<IAPIRooms>(url);

	const rooms = dataObject.data.map(room => {
		return {
			id: room.id,
			name: room.attributes.title,
			description: alterOutgoingLinks(room.attributes.field_opis),
			ingredientIds: room.relationships.field_skladniki.data.map(data => data.id),
			experimentIds: room.relationships.field_eksperymenty.data.map(data => data.id),
			order: room.attributes.field_kolejnosc
		};
	});
	return rooms.sort((a, b) => b.order - a.order);
};

export default fetchRooms;

const handleError = (error: any, URL: string): void => {
	console.error(`There has been a problem with fetching rooms.\nURL: ${URL}\nError: ${error}`);
};
