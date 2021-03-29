import React = require('react');
import { ICategoriesData } from '../../api/fetchCategories';
import fetchRooms, { IRoomsData } from '../../api/fetchRooms';
import Category from '../category';
import { useData } from '../dataProvider';
import Modal from '../generic/modal/modal';
import DinoSvg from '../resources/dino.svg';

interface IProps {
	ids: string[]
}

const RoomList: React.FC<IProps> = (props) => {
	const data = useData();
	const makeRequest = (room: IRoomsData) => {
		data.request.experiments(room.experimentIds);
		data.request.ingredients(room.ingredientIds);
	};
	const [modalDisplayed, setModalDisplayed] = React.useState(false);

	React.useEffect(() => {
		if (props.ids.length) {
			data.request.rooms(props.ids);
		}
	}, [props.ids]);

	React.useEffect(() => {
		if (data.state.rooms.data.length){
			makeRequest(data.state.rooms.data[0]);
		}		
	}, [data.state.rooms]);
	
	return <Modal
		buttonSymbol="Wybierz pokój"
		externalState={
			{
				displayed: modalDisplayed,
				manageExternalState: setModalDisplayed
			}
		}
		className="room-choice">
		{listRooms(data.state.rooms.data, makeRequest, () => setModalDisplayed(false))}
	</Modal>;
};

export default RoomList;

const listRooms = (list: IRoomsData[], makeRequest: (room: IRoomsData) => void, closeModal: () => void) => {
	if (!list || list.length === 0) return <p>W tej kategorii nie ma żadnych pokoi.</p>;
	return <ul>
		{
			list.map(roomData => {
				return <li key={roomData.id}>
					<div>
						<button
							className="choose-room"
							onClick={() => {
								makeRequest(roomData);
								closeModal();
							}}
						>{roomData.name}</button>
						<p>{roomData.description}</p>
					</div>

				</li>;
			})}
	</ul>;
};
