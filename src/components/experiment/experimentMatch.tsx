import React = require('react');
import { IExperimentsData } from '../../api/fetchExperiments';
import { IIngredientsData } from '../../api/fetchIngredients';
import { IExperimentMatchState} from '../app';
import ExperimentDisplay from './experimentDisplay';

interface IProps {
	experiments: IExperimentsData[],
	picks: IIngredientsData[],
	reportCallback: (status:IExperimentMatchState) => void
}

const ExperimentMatch: React.FC<IProps> = (props) => {

	const match = matchExperiments(props);

	React.useEffect(() => {
		props.reportCallback({
			isMatched: match.experiments.length !== 0, 
			hasPartialMatch: match.hasPartialFit,
			hasNonePicked: props.picks.length === 0
		});
	}, [props.picks]);

	return <ul className="experiments-list">
		<div className="fullwidth-background"/>
		{match.experiments.map(experiment => createExperiment(experiment, props.picks))}
	</ul>;
};

const createExperiment = (experiment: IExperimentsData, picks: IIngredientsData[]) => {
	return <li key={experiment.id}>
		<ExperimentDisplay data={experiment} ingredients={picks} />
	</li>;
};

const matchExperiments = (props: IProps): { experiments: IExperimentsData[], hasPartialFit: boolean } => {
	let output = { experiments: [], hasPartialFit: false };
	props.experiments.map(
		(experiment) => {
			let matchStatus = checkIDsMatch(props.picks, experiment.ingredientIds);
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

const checkIDsMatch = (picks: IIngredientsData[], ingredientIDs: string[]): { isMatch: boolean, isPartialFit: boolean } => {

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