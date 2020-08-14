import React = require('react');
import { ExperimentData } from '../app';
import Modal from '../generic/modal/modal';
import Markdown from 'markdown-to-jsx';
import TimedButton from './TimedButton';

interface IProps {
	data: ExperimentData
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const [activePage, setActivePage] = React.useState(props.data.instruction);

	return <Modal buttonSymbol={props.data.name}>
		<button
			onClick={() => setActivePage(props.data.instruction)}
			className={activePage === props.data.instruction ? 'active' : ''}
		>
			Instrukcja
		</button>
		<TimedButton
			onClick={() => setActivePage(props.data.explanation)}
			className={activePage === props.data.explanation ? 'active' : ''}
			seconds={6}
		>
			Wyjaśnienie
		</TimedButton>

		<Markdown>{activePage}</Markdown>
	</Modal>;
};

export default ExperimentDisplay;