import React = require('react');
import { IngredientData } from './app';

interface IProps {
	picked: IngredientData[]
}

const IngredientPicks: React.FC<IProps> = (props) => {

	return <div
		className="ingredient-picks">
		{listPicks(props.picked)}
	</div>;
};

const listPicks = (list: IngredientData[]) => {
	let output = [];
	for (let index = 0; index < 5; index++) {
		const element = list[index];

		if (element === undefined) {
			output.push(
				<span
					className="pick empty"
					key={index.toString()}
				>
					?
				</span>
			);
		} else {
			output.push(
				<span
					className="pick"
					key={index.toString()}
				>
					{element.name}
				</span>
			);
		}

	}
	return output;
};

export default IngredientPicks;