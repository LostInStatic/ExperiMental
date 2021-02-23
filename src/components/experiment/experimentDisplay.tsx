import React = require('react');
import Modal from '../generic/modal/modal';
import Markdown from 'markdown-to-jsx';
import TimedButton from './TimedButton';
import { IExperimentsData } from '../../api/fetchExperiments';
import parse from 'html-react-parser';

interface IProps {
	data: IExperimentsData
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const frontPage = assembleFrontPage(props);

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
				onClick={() => setActivePage(props.data.explanation)}
				className={activePage === props.data.explanation ? 'active' : ''}
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


const assembleFrontPage = (props: IProps) => {
	return `<div>
		<h1>${props.data.name}</h1>
		<p>${props.data.intro}</p>
		<ul>${props.data.steps.map(step => `<li>${step}</li>`).join()}</ul>
	</div>`;
};