import React = require('react');
import { IngredientData } from './app';
import CloseIndicator from './generic/closeIndicator/closeIndicator';

interface IProps {
	picked: IngredientData[],
	removePickCallback: (index: number) => void
}

const IngredientPicks: React.FC<IProps> = (props) => {

	return <div
		className="ingredient-picks">
		{createPicks(props)}
	</div>;
};

const createPicks = (props: IProps) => {
	let output = [];
	for (let index = 0; index < 5; index++) {
		const element = props.picked[index];

		if (element === undefined) {
			output.push(
				<div
					className="pick empty"
					key={index.toString()}
				>
				</div>
			);
		} else {
			output.push(
				<button
					className="pick"
					key={index.toString()}
					onClick={() => {props.removePickCallback(index);}}
				>
					{element.name}
					<CloseIndicator/>
				</button>
			);
		}

	}
	return output;
};

export default IngredientPicks;