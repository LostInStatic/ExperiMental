import React = require('react');
import Modal from '../generic/modal/modal';
import TimedButton from './TimedButton';
import { IExperimentsData } from '../../api/fetchExperiments';
import parse from 'html-react-parser';
import { IIngredientsData } from '../../api/fetchIngredients';
import IngredientIcon from '../ingredients/IngredientIcon';

interface IProps {
	data: IExperimentsData,
	ingredients: IIngredientsData[];
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const frontPage = assembleIntroPage(props);
	const explanationPage = assembleExplanationPage(props);

	const [activePage, setActivePage] = React.useState(frontPage);
	const [wasOpened, setWasOpened] = React.useState(false);

	return <div onClick={() => setWasOpened(true)}>
		<Modal
			buttonSymbol={props.data.name}
			className={
				`experiment ${activePage.id === frontPage.id ? 'intro-page' : 'explanation'
				}`
			}>
			<button
				onClick={() => setActivePage(frontPage)}
				className={activePage.id === frontPage.id ? 'active' : ''}
			>
				⇦ Instrukcja
			</button>
			<TimedButton
				experimentID={props.data.id}
				onClick={() => setActivePage(explanationPage)}
				className={activePage.id === explanationPage.id ? 'active' : ''}
				seconds={props.data.explanationDelay || 4}
				isSuspended={wasOpened ? false : true}
			>
				Wyjaśnienie ⇨
			</TimedButton>

			<div>{activePage.content}</div>
		</Modal>
	</div>;
};

export default ExperimentDisplay;


const assembleIntroPage = (props: IProps) => {
	return {
		id: 'intro-page',
		content: <>
			<h1 className="experiment-title">{props.data.name}</h1>
			<div className="intro">{parse(props.data.intro)}</div>
			{
				props.ingredients.map(
					(ingredient, index) => {
						return <IngredientIcon
							ingredientName={ingredient.name}
							type="color"
							iconUrl={ingredient.iconUrls.color}
							key={ingredient.id + index}

						/>;
					}
				)
			}
			<ul></ul>
			<h2>Instrukcja</h2>
			<ol className="instruction">{props.data.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
		</>
	};
};

const assembleExplanationPage = (props: IProps) => {
	return {
		id: 'explanation-page',
		content: <>
			<h1 className="experiment-title">{props.data.name}</h1>
			<h2>Wyjaśnienie</h2>
			{ parse(props.data.explanation)}
		</>
	};
};
