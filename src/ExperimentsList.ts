import * as ExperimentsDirectoryList from './experiments.json';
import { IExperimentData } from './components/app';

const convertToDataFormat = (
	experiment,
	experimentFilename: string
): IExperimentData => {
	if (!experiment.attributes.ingredientIDs) {
		console.error('No ingredients ids! Filename:' + experimentFilename);
		experiment.ingredientIDs = [];
	}
	if (!experiment.attributes.name) {
		console.error('No experiment name! Filename:' + experimentFilename);
		experiment.name = 'No name found';
	}
	let [instruction, explanation] = experiment.body.split('##### Wyjaśnienie');
	let output = {
		id: experimentFilename,
		name: experiment.attributes.name,
		ingredientIDs: experiment.attributes.ingredientIDs,
		instruction: instruction,
		explanation: '##### Wyjaśnienie' + explanation
	};

	if (experiment.attributes.explanationDelay) {
		output['explanationDelay'] = experiment.attributes.explanationDelay;
	}
	return output;
};

const getExperiments = () => {
	let ExperimentsList = [];

	ExperimentsDirectoryList.children.forEach(item => {
		import(`./experiments/${item.name}`)
			.then(body => {
				ExperimentsList.push(convertToDataFormat(body, item.name));
			})
			.catch(error => console.error('Failed to load experiment: ' + error));
	});

	return ExperimentsList;
};


export default getExperiments;