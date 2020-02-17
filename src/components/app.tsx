import React = require('react');
import IngredientChoice from './choice';
import IngredientPicks from './picks';

interface IProps {
	possibleIngredients: IngredientData[]
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

	</div>;
};

export type IngredientData = {
	id: string,
	name: string
}

export default App;