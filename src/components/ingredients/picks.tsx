import React = require('react');
import { IIngredientsData } from '../../api/fetchIngredients';
import IngredientIcon from './IngredientIcon';

interface IProps {
	picked: IIngredientsData[],
	removePickCallback: (index: number) => void
}

const IngredientPicks: React.FC<IProps> = (props) => {

	return <div
		className="ingredient-picks">
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
				<div className="pick-wrapper" />

			);
		} else {
			output.push(
				<div className="pick-wrapper">
					<button
						className="pick"
						key={index.toString()}
						onClick={() => { props.removePickCallback(index); }}
					>
						<IngredientIcon
							ingredientName={props.picked[index].name}
							iconUrl={props.picked[index].iconUrls.mono}
							type="mono"
						/>
					</button>
				</div>

			);
		}

	}
	return output;
};

export default IngredientPicks;