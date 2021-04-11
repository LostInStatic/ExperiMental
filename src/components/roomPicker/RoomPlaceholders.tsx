import React = require('react');
import { ReactComponent as Dino } from '../../resources/dino-frame.svg';

interface IProps {
	number: number
}

const RoomPlaceholders: React.FC<IProps> = (props) => {
	const output = [];
	for (let index = 0; index < props.number; index++) {
		output.push(
			<li>
				<div className="room-choice placeholder">
					<div className="button-placeholder">
						<Dino />
					</div>
				</div>
			</li>
		);
	}

	return <>{output}</>;
};

export default RoomPlaceholders;