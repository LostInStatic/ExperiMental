import React = require('react');
import IngredientChoice from './choice/choice';
import IngredientPicks from './picks';
import ExperimentMatch from './experiment/experimentMatch';
import IndicatorBackground from './indicatorBackground';
import Modal from './generic/modal/modal';

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

	const [matchStatus, setMatchStatus] = React.useState({
		isMatched: false,
		hasPartialMatch: false
	});

	return <div>
		<Modal buttonSymbol="☰" class="menu">
			<a href="#">just a test</a>
		</Modal>
		<div className="picks-indicator-wrapper">
			<IndicatorBackground
				experimentMatchStatus={matchStatus}
			/>
			<IngredientPicks
				picked={picks}
				removePickCallback={index => managePicks({ type: 'remove', index })}
			/>
		</div>

		<ExperimentMatch
			picks={picks}
			experiments={props.experiments}
			reportCallback={setMatchStatus}
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
	explanationDelay?: number
}

export interface IExperimentMatchState {
	isMatched: boolean,
	hasPartialMatch: boolean
}
export default App;