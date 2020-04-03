import React = require('react');
import * as ExperimentsDirectoryList from './experiments.json';
import { ExperimentData } from './components/app';


import parseFM = require('front-matter-markdown');

const convertToDataFormat = (
	experiment,
	experimentFilename: string
): ExperimentData => {
	if (!experiment.ingredientIDs) {
		console.error('No ingredients ids! Filename:' + experimentFilename);
		experiment.ingredientIDs = [];
	}
	if (!experiment.name) {
		console.error('No experiment name! Filename:' + experimentFilename);
		experiment.name = 'No name found';
	}
	return {
		id: experimentFilename,
		name: experiment.name,
		ingredientIDs: experiment.ingredientIDs,
		content: experiment.content
	};
};

const getExperiments = () => {
	let ExperimentsList = [];

	ExperimentsDirectoryList.children.forEach(item => {
		import(`./experiments/${item.name}`)
			.then(body => {
				ExperimentsList.push(convertToDataFormat(parseFM(body), item.name));
			})
			.catch(error => console.error('Failed to load experiment: ' + error));
	});

	return ExperimentsList;
};


export default getExperiments;