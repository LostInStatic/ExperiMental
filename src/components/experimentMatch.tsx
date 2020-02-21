import React = require('react');
import { ExperimentData, IngredientData } from './app';
import IngredientPicks from './picks';

interface IProps {
	experiments: ExperimentData[],
	picks: IngredientData[],
	reportCallback: (isMatched:boolean) => void
}

const ExperimentMatch: React.FC<IProps> = (props) => {



	return <div
		className="experiments-match"
	>
		<ul>
			{
				matchExperiments(props).map(
					createExperiment
				)
			}
		</ul>

	</div>;
};

const createExperiment = (experiment: ExperimentData) => {
	return <li>
		<h4>{experiment.name}</h4>
		<p>{experiment.description}</p>
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
	props.reportCallback(output.length !== 0);
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