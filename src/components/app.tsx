import React = require('react');
import IngredientChoice from './choice';
import IngredientPicks from './picks';
import ExperimentMatch from './experimentMatch';

interface IProps {
	possibleIngredients: IngredientData[]
	experiments: ExperimentData[]
}

const App: React.FC<IProps> = (props) => {

	const [picks, addPick] = React.useReducer(
		(state: IngredientData[], newPickID: string) => {
			return [...state, props.possibleIngredients.find(({ id }) => id === newPickID)];
		},
		[]
	);

	return <div>
		<IngredientPicks
			picked={picks}



		/>
		{
			(picks.length < 5) ?
				<IngredientChoice
					ingredients={props.possibleIngredients}
					callback={(id) => { addPick(id); }}
				/>
				:
				<div>Maksymalna ilość wybrana!</div>
		}

		<ExperimentMatch
			picks={picks}
			experiments={props.experiments}
		/>

	</div>;
};



export type IngredientData = {
	id: string,
	name: string
}

export type ExperimentData = {
	id: string,
	ingredientIDs: string[],
	name: string,
	description: string
}

export default App;