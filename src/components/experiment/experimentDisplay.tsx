import React = require('react');
import Modal from '../generic/modal/modal';
import TimedButton from './TimedButton';
import { IExperimentsData } from '../../api/fetchExperiments';
import parse from 'html-react-parser';
import { IIngredientsData } from '../../api/fetchIngredients';
import IngredientIcon from '../ingredients/IngredientIcon';
import Dropdown from '../generic/dropdown/dropdown';
import { ReactComponent as IconArrow } from '../../resources/arrow.svg';
import Background from './background';
import CookiesProvider from '../../cookiesProvider';



interface IProps {
	data: IExperimentsData,
	ingredients: IIngredientsData[];
	seenCallback: (experiment: IExperimentsData) => void
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const frontPage = assembleIntroPage(props);
	const explanationPage = assembleExplanationPage(props);

	const [activePage, setActivePage] = React.useState(frontPage);
	const [wasOpened, setWasOpened] = React.useState(false);
	React.useEffect(
		() => {
			const CookieName = `experiment-seen${props.data.id}`;
			if (wasOpened) {
				CookiesProvider.set(CookieName, 'true', true, 7);
				props.seenCallback(props.data);
			} else if (CookiesProvider.get(CookieName) === 'true') {
				setWasOpened(true);
			} 
		}
	);

	return <div onClick={() => setWasOpened(true)}>
		<Modal
			buttonSymbol={props.data.name}
			className={
				`experiment
				${activePage.id === frontPage.id ? ' intro-page' : ' explanation'}
				${wasOpened ? ' seen' : ''}
				`
			}>
			<button
				onClick={() => setActivePage(frontPage)}
				className={`intro-page-button arrow-button ${activePage.id === frontPage.id ? 'active' : ''}`}
			>
				<IconArrow /> Instrukcja
			</button>
			<TimedButton
				experimentID={props.data.id}
				onClick={() => setActivePage(explanationPage)}
				className={`explanation-page-button arrow-button ${activePage.id === explanationPage.id ? 'active' : ''}`}
				seconds={props.data.explanationDelay || 4}
				isSuspended={wasOpened ? false : true}
			>
				Wyjaśnienie<IconArrow />
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
			<div className="experiment-summary">
				<Background experiment={props.data} />
				<div>
					<h1 className="experiment-title">{props.data.name}</h1>
					<div className="intro">{parse(props.data.intro)}</div>
				</div>
			</div>
			<ul className="experiment-icons-list">
				{
					props.ingredients.map(
						(ingredient, index) => {
							return <li key={ingredient.id}>
								<IngredientIcon
									ingredientName={ingredient.name}
									type="color"
									iconUrl={ingredient.iconUrls.color}
									key={ingredient.id + index}

								/>
							</li>;
						}
					)
				}
			</ul>
			<Dropdown
				key="intro-dropdown"
				buttonLabel="Instrukcja"
			>
				<ol className="instruction">{
					props.data.steps.map((step, index) => <li key={index}>{step}</li>)
				}</ol>
			</Dropdown>

		</>
	};
};

const assembleExplanationPage = (props: IProps) => {
	return {
		id: 'explanation-page',
		content: <>
			<div className="experiment-summary">
				<Background experiment={props.data} />
				<div>
					<h1 className="experiment-title">{props.data.name}</h1>
					<h2>Wyjaśnienie</h2>
					
				</div>
			</div>
			{parse(props.data.explanation)}
			{
				props.data.references ?
					<Dropdown
						buttonLabel="Odnośniki"
						key="explanation-dropdown"
					>
						{parse(props.data.references)}
					</Dropdown>
					:
					''
			}

		</>
	};
};
