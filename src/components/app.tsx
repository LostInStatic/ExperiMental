import React = require('react');
import IngredientChoice from './choice';
import IngredientPicks from './picks';
import ExperimentMatch from './experimentMatch';

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



	return <div>
		<IngredientPicks
			picked={picks}
			removePickCallback={index => managePicks({ type: 'remove', index })}

		/>
		{
			(picks.length < 5) ?
				<IngredientChoice
					ingredients={props.possibleIngredients}
					callback={id => managePicks({ type: 'add', id })}
				/>
				:
				<div>
				<div
					className="max-picks-message">

					Maksymalna ilość wybrana!

					<button
						className="clear"
						onClick={() => managePicks({ type: 'clear' })}
					>
						⭯
					</button>
				</div>
		}

		<ExperimentMatch
			picks={picks}
			experiments={props.experiments}
		/>

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