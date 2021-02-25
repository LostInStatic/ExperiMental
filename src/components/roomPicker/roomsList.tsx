import React = require('react');
import fetchRooms, { IRoomsData } from '../../api/fetchRooms';

interface IProps {
	callback: (room: IRoomsData) => void
}

const RoomList: React.FC<IProps> = (props) => {

	const [rooms, setRooms] = React.useState([] as IRoomsData[]);

	React.useEffect(() => {
		const updateRooms = async () => {
			const rooms = await fetchRooms('all');
			setRooms(rooms);
		};
		updateRooms();
	}, []);

	return <div
		className="ingredient-choice">
		{listRooms(rooms, props.callback)}
	</div>;
};

export default RoomList;

const listRooms = (list: IRoomsData[], callback: (id: IRoomsData) => void) => {
	return <ul>
		{
			list.map(roomData => {
				return <li key={roomData.id}>
					<button
						className="choose-room"
						onClick={() => {
							callback(roomData);
						}}
					>{roomData.name}</button>
					<p>{roomData.description}</p>
				</li>;
			})}
	</ul>;
};