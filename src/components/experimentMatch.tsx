import React = require('react');
import { ExperimentData, IngredientData } from './app';
import IngredientPicks from './picks';
import Markdown from 'markdown-to-jsx';
import Dropdown from './generic/dropdown/dropdown';
import Modal from './generic/modal/modal';
import Indicator from './indicator';

interface IProps {
	experiments: ExperimentData[],
	picks: IngredientData[],
	reportCallback: (isMatched: boolean) => void
}

const ExperimentMatch: React.FC<IProps> = (props) => {

	const match = matchExperiments(props);

	React.useEffect(() => {
		props.reportCallback(match.length !== 0);
	}, [props.picks]);


	return <Indicator
		isTrue={match.length !== 0}
	>
		<ul>
			{
				match.map(createExperiment)
			}
		</ul>
	</Indicator>;
};

const createExperiment = (experiment: ExperimentData) => {
	return <li>
		<Modal buttonSymbol={experiment.name}>
			<Markdown>{experiment.content}</Markdown>
		</Modal>
	</li>;
};

const matchExperiments = (props: IProps): ExperimentData[] => {
	let output = [];
	props.experiments.map(
		(experiment) => {
			if (checkIDsMatch(props.picks, experiment.ingredientIDs)) {
				output.push(experiment);
			}
		}
	);
	return output;
};

const checkIDsMatch = (picks: IngredientData[], ingredientIDs: string[]): boolean => {

	if (picks.length !== ingredientIDs.length) return false;

	picks = picks.slice()
		.sort(
			(a, b) => {
				if (a.id < b.id) {
					return -1;
				}
				if (a.id > b.id) {
					return 1;
				}
			}
		);

	ingredientIDs.sort();

	for (let index = 0; index < picks.length; index++) {
		const pickID = picks[index].id;
		const ingredientID = ingredientIDs[index];
		if (pickID !== ingredientID) return false;
	}
	return true;
};

export default ExperimentMatch;