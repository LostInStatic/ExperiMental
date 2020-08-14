import React = require('react');
import IngredientChoice from './choice/choice';
import IngredientPicks from './picks';
import ExperimentMatch from './experimentMatch';
import Indicator from './indicator';

interface IProps {
	possibleIngredients: IngredientData[]
	experiments: ExperimentData[]
}

const App: React.FC<IProps> = (props) => {

	const picksDispatch = React.useCallback(
		createPicksReducer(props),
		[props]
	);

	const [picks, managePicks] = React.useReducer(
		picksDispatch,
		[]
	);

	const [isMatch, setMatch] = React.useState(false);

	return <div>
		<IngredientPicks
			picked={picks}
			removePickCallback={index => managePicks({ type: 'remove', index })}

		/>
		<ExperimentMatch
			picks={picks}
			experiments={props.experiments}
			reportCallback={setMatch}
		/>
		{
			(picks.length < 5) ?
				<IngredientChoice
					ingredients={props.possibleIngredients}
					callback={id => managePicks({ type: 'add', id })}
				/>
				:
				<div
					className="max-picks-message">

					Maksymalna ilość wybrana!

					<button
						className="clear"
						onClick={() => managePicks({ type: 'clear' })}
					>
						&#8634;
					</button>
				</div>
		}


	</div>;
};

const createPicksReducer = (props: IProps) => {
	return (
		state: IngredientData[],
		action: IManagePickAction['remove' | 'add' | 'clear']
	): IngredientData[] => {

		switch (action.type) {
			case 'add':
				return [...state, props.possibleIngredients.find(({ id }) => id === action.id)];
			case 'remove':
				state.splice(action.index, 1);
				return [...state];
			case 'clear':
				return [];

			default:
				return state;
		}
	};
};

interface IManagePickAction {
	remove: {
		type: 'remove',
		index: number
	},
	add: {
		type: 'add',
		id: string
	}
	clear: {
		type: 'clear'
	}

}

export interface IngredientData {
	id: string,
	name: string
}

export interface ExperimentData {
	id: string,
	ingredientIDs: string[],
	name: string,
	instruction: string,
	explanation: string
}

export default App;