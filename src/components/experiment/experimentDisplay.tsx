import React = require('react');
import { IExperimentData } from '../app';
import Modal from '../generic/modal/modal';
import Markdown from 'markdown-to-jsx';
import TimedButton from './TimedButton';

interface IProps {
	data: IExperimentData
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const [activePage, setActivePage] = React.useState(props.data.instruction);
	const [wasOpened, setWasOpened] = React.useState(false);

	return <div onClick={() => setWasOpened(true)}>
		<Modal buttonSymbol={props.data.name}>
			<button
				onClick={() => setActivePage(props.data.instruction)}
				className={activePage === props.data.instruction ? 'active' : ''}
			>
				Instrukcja
			</button>
			<TimedButton
				experimentID={props.data.id}
				onClick={() => setActivePage(props.data.explanation)}
				className={activePage === props.data.explanation ? 'active' : ''}
				seconds={props.data.explanationDelay || 4}
				isSuspended ={wasOpened ? false : true}
			>
				Wyjaśnienie
			</TimedButton>

			<Markdown>{activePage}</Markdown>
		</Modal>
	</div>;
};

export default ExperimentDisplay;