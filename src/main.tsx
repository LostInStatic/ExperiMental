
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';
import getExperiments from './ExperimentsList';

const experiments = getExperiments();

const possibleIngredients = [
	{
		id: 'water',
		name: 'Woda'
	},
	{
		id: 'paper',
		name: 'Papierowa kartka'
	},
	{
		id: 'baloon',
		name: 'Balon'
	},
	{
		id: 'pet-bottle',
		name: 'Butelka PET'
	},
	{
		id: 'scissors',
		name: 'Nożyczki'
	}
];

ReactDOM.render(
	<App
		possibleIngredients={possibleIngredients}
		experiments={experiments}
	/>,
	document.getElementById('root')
);

