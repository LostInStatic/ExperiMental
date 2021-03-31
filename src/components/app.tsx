import React = require('react');
import IngredientChoice from './ingredients/choice';
import IngredientPicks from './ingredients/picks';
import ExperimentMatch from './experiment/experimentMatch';
import IndicatorBackground from './indicatorBackground';
import { IIngredientsData } from '../api/fetchIngredients';
import Menu from './generic/menu/menu';
import Modal from './generic/modal/modal';
import RoomList from './roomPicker/roomsList';
import { IRoomsData } from '../api/fetchRooms';
import Welcome from './welcome';
import { ReactComponent as AboutIcon } from '../resources/questionMark.svg';
import fetchTextBlocks, { ITextBlockData } from '../api/fetchTextBlocks';
import parse from 'html-react-parser';
import LoadingScreen from './loadingScreen';
import { useData } from './dataProvider';
import CategorySelection from './category/selection';

interface IProps {
	roomIds: string[]
	textBlockIds: string[]
}


const App: React.FC<IProps> = (props) => {
	const data = useData();
	React.useEffect(() => {
		if (props.textBlockIds.length) {
			data.request.textBlocks(props.textBlockIds);
		}
	}, [props.textBlockIds]);

	const picksDispatch = React.useCallback(
		createPicksReducer(data.state.ingredients.data),
		[data.state.experiments.data, data.state.ingredients.data]
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
		<LoadingScreen />
		<RoomList
			ids={props.roomIds}
		/>
		<Menu buttonLabel={AboutIcon} className="about" key="about">
			{generateAbout(data.state.textBlocks.data)}
		</Menu>
		<div className="picks-indicator-wrapper">
			<div className="fullwidth-background" />
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
			experiments={data.state?.experiments?.data || []}
			reportCallback={setMatchStatus}
		/>

		<IngredientChoice
			ingredients={data.state.ingredients.data}
			callback={id => managePicks({ type: 'add', id })}
			locked={!( matchStatus.hasPartialMatch || matchStatus.hasNonePicked )}
		/>
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