import React = require('react');
import Modal from '../generic/modal/modal';
import Markdown from 'markdown-to-jsx';
import TimedButton from './TimedButton';
import { IExperimentsData } from '../../api/fetchExperiments';

interface IProps {
	data: IExperimentsData
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const [activePage, setActivePage] = React.useState(props.data.steps.join('/n'));
	const [wasOpened, setWasOpened] = React.useState(false);

	return <div onClick={() => setWasOpened(true)}>
		<Modal
			buttonSymbol={props.data.name}
			className="experiment-button">
			<button
				onClick={() => setActivePage(props.data.steps.join('/n'))}
				className={activePage === props.data.steps.join('/n') ? 'active' : ''}
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

			<Markdown>{activePage}</Markdown>
		</Modal>
	</div>;
};

export default ExperimentDisplay;