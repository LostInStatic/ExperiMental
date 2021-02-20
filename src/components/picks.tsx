import React = require('react');
import { IngredientData } from './app';
import CloseIndicator from './generic/closeIndicator/closeIndicator';
// @ts-ignore
import circleBackground from '../resources/background.svg';

interface IProps {
	picked: IngredientData[],
	removePickCallback: (index: number) => void
}

const IngredientPicks: React.FC<IProps> = (props) => {

	return <div
		className="ingredient-picks">
		<img src={circleBackground} alt="" className="circle" />
		<div className="picks-container">
			{createPicks(props)}
		</div>

	</div>;
};

const createPicks = (props: IProps) => {
	let output = [];
	for (let index = 0; index < 5; index++) {
		const element = props.picked[index];



		if (element === undefined) {
			output.push(
				<div className="pick-wrapper"/>

			);
		} else {
			output.push(
				<div className="pick-wrapper">
					<button
						className="pick"
						key={index.toString()}
						onClick={() => { props.removePickCallback(index); }}
					>
						{element.name}
						<CloseIndicator />
					</button>
				</div>

			);
		}

	}
	return output;
};

export default IngredientPicks;