import React = require('react');
import fetchRooms, { IRoomsData } from '../../api/fetchRooms';
import Modal from '../generic/modal/modal';

interface IProps {
	callback: (room: IRoomsData) => void
}

const RoomList: React.FC<IProps> = (props) => {

	const [modalDisplayed, setModalDisplayed] = React.useState(false);
	const [rooms, setRooms] = React.useState([] as IRoomsData[]);

	React.useEffect(() => {
		const updateRooms = async () => {
			const rooms = await fetchRooms('all');
			setRooms(rooms);
		};
		updateRooms();
	}, []);

	return <Modal
		buttonSymbol="Wybierz pokój"
		externalState={
			{
				displayed: modalDisplayed,
				manageExternalState: setModalDisplayed
			}
		}
		className="room-choice">
		{listRooms(rooms, props.callback, () => setModalDisplayed(false))}
	</Modal>;
};

export default RoomList;

const listRooms = (list: IRoomsData[], callback: (id: IRoomsData) => void, closeModal: ()=>void) => {
	return <ul>
		{
			list.map(roomData => {
				return <li key={roomData.id}>
					<button
						className="choose-room"
						onClick={() => {
							callback(roomData);
							closeModal();
						}}
					>{roomData.name}</button>
					<p>{roomData.description}</p>
				</li>;
			})}
	</ul>;
};