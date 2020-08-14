import React = require('react');
import { ExperimentData } from '../app';
import Modal from '../generic/modal/modal';
import Markdown from 'markdown-to-jsx';
import Pages from './pages';

interface IProps {
	data: ExperimentData
}

const ExperimentDisplay: React.FC<IProps> = (props) => {

	const pages = [
		{name: 'Instrukcja', content: <Markdown>{props.data.instruction}</Markdown>},
		{name: 'Wyjaśnienie', content: <Markdown>{props.data.explanation}</Markdown>}
	];

	return <Modal buttonSymbol={props.data.name}>
		<Pages pages={pages}/>
	</Modal>;
};

export default ExperimentDisplay;