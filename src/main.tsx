
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';

const data = {
	possibleIngredients: [
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
	]
};

ReactDOM.render(<App possibleIngredients={data.possibleIngredients}/>, document.getElementById('root'));

