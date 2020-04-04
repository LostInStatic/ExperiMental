import React = require('react');
import * as ExperimentsDirectoryList from './experiments.json';
import { ExperimentData } from './components/app';

const convertToDataFormat = (
	experiment,
	experimentFilename: string
): ExperimentData => {
	if (!experiment.attributes.ingredientIDs) {
		console.error('No ingredients ids! Filename:' + experimentFilename);
		experiment.ingredientIDs = [];
	}
	if (!experiment.attributes.name) {
		console.error('No experiment name! Filename:' + experimentFilename);
		experiment.name = 'No name found';
	}
	return {
		id: experimentFilename,
		name: experiment.attributes.name,
		ingredientIDs: experiment.attributes.ingredientIDs,
		content: experiment.body
	};
};

const getExperiments = () => {
	let ExperimentsList = [];

	ExperimentsDirectoryList.children.forEach(item => {
		import(`./experiments/${item.name}`)
			.then(body => {
				console.log(body);
				ExperimentsList.push(convertToDataFormat(body, item.name));
			})
			.catch(error => console.error('Failed to load experiment: ' + error));
	});

	return ExperimentsList;
};


export default getExperiments;