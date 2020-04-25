
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';
import getExperiments from './ExperimentsList';
import getData from './getData';
const experiments = getExperiments();

let possibleIngredients = [
	/* {
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
	} */
];
getData('/products/').then(data => {
	possibleIngredients = data._embedded.products;
	for (let index = 0; index < possibleIngredients.length; index++) {
		possibleIngredients[index].id = index.toString();
	}
	if (possibleIngredients.length === 0) {
		possibleIngredients.push({ id: '0', name: 'pusta DB' });
	}
	ReactDOM.render(
		<App
			possibleIngredients={possibleIngredients}
			experiments={experiments}
		/>,
		document.getElementById('root')
	);

});


