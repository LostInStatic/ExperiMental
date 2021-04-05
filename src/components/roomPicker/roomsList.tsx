import React = require('react');
import { ICategoriesData } from '../../api/fetchCategories';
import fetchRooms, { IRoomsData } from '../../api/fetchRooms';
import CategorySelection from '../category/selection';
import { useData } from '../dataProvider';
import Dropdown from '../generic/dropdown/dropdown';
import { ReactComponent as PlanetIcon } from '../../resources/planet.svg';
//import { ReactComponent as CurrentIcon } from /..;
import ModalBox from '../generic/modal/modalBox';
//import DinoSvg from '../resources/dino.svg';
import CloseButton from '../generic/modal/closeButton';
import CurrentIcon from '../../resources/rocket.gif';

interface IProps {
	ids: string[]
}

const RoomList: React.FC<IProps> = (props) => {
	const data = useData();

	const [modalDisplayed, setModalDisplayed] = React.useState(false);
	const [currentRoom, setCurrentRoom] = React.useState('');

	const makeRequest = (room: IRoomsData) => {
		if (room.id === currentRoom) return;
		setCurrentRoom(room.id);
		data.request.experiments(room.experimentIds);
		data.request.ingredients(room.ingredientIds);
	};

	React.useEffect(() => {
		if (props.ids.length) {
			data.request.rooms(props.ids);
		}
	}, [props.ids]);

	React.useEffect(() => {
		if (data.state.rooms.data.length) {
			makeRequest(data.state.rooms.data[0]);
		}
	}, [data.state.rooms]);

	return <>
		<button
			onClick={() => setModalDisplayed(true)}
			className="menu-button main"
		>
			<PlanetIcon />
		</button>
		<ModalBox
			displayed={modalDisplayed}
			className={'room-dialog'}
		>
			<CloseButton onClick={() => setModalDisplayed(false)}/>
			<div className="room-dialog_header">
				<h1>Wybierz <br /> pokój</h1>
				<Dropdown buttonLabel={<><div>Zmień <br/> kategorię</div></>} className="category-dropdown">
					<CategorySelection />
				</Dropdown>
			</div>
			{listRooms(data.state.rooms.data,
				currentRoom,
				makeRequest,
				() => setModalDisplayed(false))}
		</ModalBox>
	</>;
};

export default RoomList;

const listRooms = (
	list: IRoomsData[],
	currentRoom: string,
	makeRequest: (room: IRoomsData) => void,
	closeModal: () => void) => {
	if (!list || list.length === 0) return <p>W tej kategorii nie ma żadnych pokoi.</p>;
	return <ul className="rooms-list">
		{
			list.map(roomData => {
				return <li key={roomData.id}>

					<div className='room-choice'>
						{currentRoom === roomData.id && <img src={CurrentIcon} alt="" />}
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
