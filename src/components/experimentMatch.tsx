import React = require('react');
import { ExperimentData, IngredientData } from './app';
import IngredientPicks from './picks';
import Markdown from 'markdown-to-jsx';

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


	return <div
		className="experiments-match"
	>
		<ul>
			{
				match.map(createExperiment)
			}
		</ul>

	</div>;
};

const createExperiment = (experiment: ExperimentData) => {
	return <li>
		<Markdown>{experiment.content}</Markdown>
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