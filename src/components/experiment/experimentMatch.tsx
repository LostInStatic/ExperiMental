import React = require('react');
import { IExperimentsData } from '../../api/fetchExperiments';
import { IIngredientsData } from '../../api/fetchIngredients';
import CookiesProvider from '../../cookiesProvider';
import { IExperimentMatchState } from '../app';
import Counter from './counter';
import ExperimentDisplay from './experimentDisplay';

interface IProps {
	experiments: IExperimentsData[],
	picks: IIngredientsData[],
	reportCallback: (status: IExperimentMatchState) => void
}

const ExperimentMatch: React.FC<IProps> = (props) => {

	const match = matchExperiments(props);
	const [seenCount, setSeenCount] = React.useState(0);

	React.useEffect(
		() => {
			setSeenCount(getSeenExperimentsCount(props.experiments));
		},
		[props.experiments]
	);

	React.useEffect(() => {
		props.reportCallback({
			isMatched: match.experiments.length !== 0,
			hasPartialMatch: match.hasPartialFit,
			hasNonePicked: props.picks.length === 0
		});
	}, [props.picks]);

	return <div className="experiments-list-wrapper">
		<ul className="experiments-list">
			{match.experiments.map(experiment => createExperiment(experiment, props.picks, () => setSeenCount(getSeenExperimentsCount(props.experiments))))}
		</ul>
		<Counter seen={seenCount}/>
	</div>;
};

const createExperiment = (experiment: IExperimentsData, picks: IIngredientsData[], seenCallback) => {
	return <li key={experiment.id}>
		<ExperimentDisplay data={experiment} ingredients={picks} seenCallback={seenCallback} />
	</li>;
};

const matchExperiments = (props: IProps): { experiments: IExperimentsData[], hasPartialFit: boolean } => {
	const output = { experiments: [], hasPartialFit: false };
	props.experiments.map(
		(experiment) => {
			const matchStatus = checkIDsMatch(props.picks, experiment.ingredientIds);
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

	const output = { isMatch: true, isPartialFit: true };
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
	const obj = {};
	array.map(
		(element) => {
			obj[element] ? obj[element] = obj[element] + 1 : obj[element] = 1;
		}
	);
	return obj;
};

const getSeenExperimentsCount = (experiments: IExperimentsData[]) => {
	return experiments.filter(
		experiment => {
			return CookiesProvider.get(`experiment-seen${experiment.id}`) === 'true';
		}
	).length;
};

export default ExperimentMatch;