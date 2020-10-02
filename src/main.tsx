
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';
import getExperiments from './ExperimentsList';
import getData from './getData';
import registerServiceWorker from './registerServiceWorker';
const experiments = getExperiments();

registerServiceWorker();

const possibleIngredientsFallback = [
	{
		id: 'water',
		name: 'Woda'
	},
	{
		id: 'paper',
		name: 'Papierowa kartka'
	},
	{
		id: 'balloon',
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

getData('./products').then(data => {
	let possibleIngredients = [];
	try {
		possibleIngredients = data._embedded.products;
		if (possibleIngredients.length === 0) {
			throw 'Ingredients empty!';
		}
	} catch (error) {
		console.error('Invalid ingredients list, using fallback.\n', error);
		possibleIngredients = possibleIngredientsFallback;
	}
	ReactDOM.render(
		<App
			possibleIngredients={possibleIngredients}
			experiments={experiments}
		/>,
		document.getElementById('root')
	);

});



