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
	const dataObject = await fetchJSON<IAPIRooms>(
		APIURLS.rooms + addAPIParameters({
			specificIds: ids
		})
	);
	let rooms = dataObject.data.map(room => {
		return {
			id: room.id,
			name: room.attributes.title,
			description: room.attributes.field_opis,
			ingredientIds: room.relationships.field_skladniki.data.map(data => data.id),
			experimentIds: room.relationships.field_eksperymenty.data.map(data => data.id),
			order: room.attributes.field_kolejnosc

		};
	});
	if (rooms.length === 0) {
		throw 'Room list empty!';
	}
	return rooms.sort((a, b) => b.order - a.order);
};

export default fetchRooms;
