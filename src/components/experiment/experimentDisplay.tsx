import React = require('react');
import Modal from '../generic/modal/modal';
import TimedButton from './TimedButton';
import { IExperimentsData } from '../../api/fetchExperiments';
import parse from 'html-react-parser';

interface IProps {
	data: IExperimentsData
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const frontPage = assembleIntroPage(props);
	const explanationPage = assembleExplanationPage(props);

	const [activePage, setActivePage] = React.useState(frontPage);
	const [wasOpened, setWasOpened] = React.useState(false);

	return <div onClick={() => setWasOpened(true)}>
		<Modal
			buttonSymbol={props.data.name}
			className="experiment-button">
			<button
				onClick={() => setActivePage(frontPage)}
				className={activePage === frontPage ? 'active' : ''}
			>
				Instrukcja
			</button>
			<TimedButton
				experimentID={props.data.id}
				onClick={() => setActivePage(explanationPage)}
				className={activePage === explanationPage ? 'active' : ''}
				seconds={props.data.explanationDelay || 4}
				isSuspended={wasOpened ? false : true}
			>
				Wyjaśnienie
			</TimedButton>

			<div>{parse(activePage)}</div>
		</Modal>
	</div>;
};

export default ExperimentDisplay;


const assembleIntroPage = (props: IProps) => {
	return `<div>
		<h1 class="experiment-title">${props.data.name}</h1>
		<div class="intro">${props.data.intro}</div>
		<h2>Instrukcja</h2>
		<ol class="instruction">${props.data.steps.map(step => `<li>${step}</li>`).join('')}</ol>
	</div>`;
};

const assembleExplanationPage = (props: IProps) => {
	return `<div>
		<h1 class="experiment-title">${props.data.name}</h1>
		<h2>Wyjaśnienie</h2>
		${props.data.explanation}
	</div>`;
};