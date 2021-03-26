import React = require('react');
import IngredientChoice from './ingredients/choice';
import IngredientPicks from './ingredients/picks';
import ExperimentMatch from './experiment/experimentMatch';
import IndicatorBackground from './indicatorBackground';
import fetchIngredients, { IIngredientsData } from '../api/fetchIngredients';
import fetchExperiments, { IExperimentsData } from '../api/fetchExperiments';
import Menu from './generic/menu/menu';
import Modal from './generic/modal/modal';
import RoomList from './roomPicker/roomsList';
import fetchRooms, { IRoomsData } from '../api/fetchRooms';
import Welcome from './welcome';
import { ReactComponent as MainMenuIcon } from '../resources/planet.svg';
import { ReactComponent as AboutIcon } from '../resources/questionMark.svg';
import fetchTextBlocks, { ITextBlockData } from '../api/fetchTextBlocks';
import parse from 'html-react-parser';
import LoadingScreen from './loadingScreen';

interface IProps {
	defaultRoom: IRoomsData
}


const App: React.FC<IProps> = (props) => {
	const [experimentIds, setExperimentIds] = React.useState(props.defaultRoom.experimentIds);
	const [ingredientIds, setIngredientIds] = React.useState(props.defaultRoom.ingredientIds);
	const [textBlocks, setTextBlocks] = React.useState([]);

	const [experiments, setExperiments] = React.useState([] as IExperimentsData[]);

	React.useEffect(() => {
		const updateRooms = async () => {
			const rooms = await fetchTextBlocks('all');
			setTextBlocks(rooms);
		};
		updateRooms();
	}, []);

	React.useEffect(() => {
		const updateExperiments = async () => {
			const experiments = await fetchExperiments(experimentIds);
			setExperiments(experiments);
		};
		updateExperiments();
	}, [experimentIds]);

	const [ingredients, setIngredients] = React.useState([] as IIngredientsData[]);

	React.useEffect(() => {
		const updateIngredients = async () => {
			const ingredients = await fetchIngredients(ingredientIds);
			setIngredients(ingredients);
		};
		updateIngredients();
	}, [ingredientIds]);

	const picksDispatch = React.useCallback(
		createPicksReducer(ingredients),
		[experiments, ingredients]
	);

	const [picks, managePicks] = React.useReducer(
		picksDispatch,
		[]
	);

	const [matchStatus, setMatchStatus] = React.useState({
		isMatched: false,
		hasPartialMatch: false,
		hasNonePicked: true
	});

	return <>
		<Welcome />
		<LoadingScreen/>
		<Menu buttonLabel={MainMenuIcon} className="main" key="main">

			<RoomList
				callback={
					room => {
						setExperimentIds(room.experimentIds);
						setIngredientIds(room.ingredientIds);
					}
				}
			/>
		</Menu>
		<Menu buttonLabel={AboutIcon} className="about" key="about">
			{generateAbout(textBlocks)}
		</Menu>
		<div className="picks-indicator-wrapper">
			<div className="fullwidth-background"/>
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
			experiments={experiments}
			reportCallback={setMatchStatus}
		/>
		{
			(picks.length < 5) ?
				<IngredientChoice
					ingredients={ingredients}
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


	</>;
};

const createPicksReducer = (ingredients: IIngredientsData[]) => {
	return (
		state: IIngredientsData[],
		action: IManagePickAction['remove' | 'add' | 'clear']
	): IIngredientsData[] => {

		switch (action.type) {
			case 'add':
				return [...state, ingredients.find(({ id }) => id === action.id)];
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

const generateAbout = (textBlocks: ITextBlockData[]) => {
	return selectTextBlocksByAnchor('about', textBlocks).map(
		textBlock => {
			return <Modal
				key={`about_${textBlock.id}`}
				buttonSymbol={textBlock.name}
			>
				{parse(textBlock.content)}
			</Modal>;
		}
	);
};


const selectTextBlocksByAnchor = (
	anchorID: string,
	textBlocks: ITextBlockData[]
) => {
	return textBlocks.filter(
		textBlock => textBlock.anchor === anchorID
	);
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

export interface IIngredientData {
	id: string,
	name: string,
	iconUrls?: {
		mono?: string,
		color?: string
	}
}

export interface IExperimentData {
	id: string,
	ingredientIDs: string[],
	name: string,
	instruction: string,
	explanation: string
	explanationDelay?: number
}

export interface IExperimentMatchState {
	isMatched: boolean,
	hasPartialMatch: boolean,
	hasNonePicked: boolean
}
export default App;