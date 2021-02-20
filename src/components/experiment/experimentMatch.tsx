import React = require('react');
import { IExperimentData, IExperimentMatchState, IIngredientData } from '../app';
import ExperimentDisplay from './experimentDisplay';

interface IProps {
	experiments: IExperimentData[],
	picks: IIngredientData[],
	reportCallback: (status:IExperimentMatchState) => void
}

const ExperimentMatch: React.FC<IProps> = (props) => {

	const match = matchExperiments(props);

	React.useEffect(() => {
		props.reportCallback({
			isMatched: match.experiments.length !== 0, 
			hasPartialMatch: match.hasPartialFit
		});
	}, [props.picks]);

	return <ul>
		{match.experiments.map(createExperiment)}
	</ul>;
};

const createExperiment = (experiment: IExperimentData) => {
	return <li key={experiment.id}>
		<ExperimentDisplay data={experiment} />
	</li>;
};

const matchExperiments = (props: IProps): { experiments: IExperimentData[], hasPartialFit: boolean } => {
	let output = { experiments: [], hasPartialFit: false };
	props.experiments.map(
		(experiment) => {
			let matchStatus = checkIDsMatch(props.picks, experiment.ingredientIDs);
			if (matchStatus.isMatch) {
				output.experiments.push(experiment);
			}
			if (matchStatus.isPartialFit) {
				output.hasPartialFit = true;
			}
		}
	);

	return output;
};

const checkIDsMatch = (picks: IIngredientData[], ingredientIDs: string[]): { isMatch: boolean, isPartialFit: boolean } => {

	if (picks.length > ingredientIDs.length) return { isMatch: false, isPartialFit: false };
	if (picks.length === 0) return { isMatch: false, isPartialFit: true };

	const pickIDsCount = createIDCount(picks.map(({ id }) => id));
	const ingredientIDsCount = createIDCount(ingredientIDs);

	let output = { isMatch: true, isPartialFit: true };
	let IDsNotProcessed = Object.keys(pickIDsCount);

	for (const key in ingredientIDsCount) {
		if (Object.prototype.hasOwnProperty.call(ingredientIDsCount, key)) {
			if (pickIDsCount[key]) {

				IDsNotProcessed = IDsNotProcessed.filter(item => item !== key);

				const pickedCount = pickIDsCount[key];
				const ingredientCount = ingredientIDsCount[key];
				if (pickedCount !== ingredientCount) output.isMatch = false;
				if (pickedCount > ingredientCount) output.isPartialFit = false;
			} else {
				output.isMatch = false;
			}
			if (!output.isMatch && !output.isPartialFit) return output;
		}
	}

	if (IDsNotProcessed.length !== 0) return { isMatch: false, isPartialFit: false };

	return output;
};

const createIDCount = (array) => {
	let obj = {};
	array.map(
		(element) => {
			obj[element] ? obj[element] = obj[element] + 1 : obj[element] = 1;
		}
	);
	return obj;
};

export default ExperimentMatch;