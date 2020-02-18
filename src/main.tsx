
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
	],
	experiments: [
		{
			id: 'static-baloons',
			ingredientIDs: [
				'baloon',
				'paper'
			],
			name: 'Przyciąganie i odpychanie balonów',
			description: 'przyciąganie i odpychanie balonów z elektryzowania - rzeczy: balon, kartka'
		},
		{
			id: 'pressure-baloons',
			ingredientIDs: [
				'baloon',
				'baloon'
			],
			name: '"Przyciąganie" balonów',
			description: '"Przyciąganie" balonów (ciśnienie) - rzeczy: balon x 2'
		},
		{
			id: 'static-baloon-paper',
			ingredientIDs: [
				'baloon',
				'paper'
			],
			name: '"Balon przyciągający kawałki papieru',
			description: 'Naelektryzowany balon przyciągający kawałki papieru - rzeczy: balon, kartka papieru'
		},
		{
			id: 'static-baloons-water',
			ingredientIDs: [
				'baloon',
				'water'
			],
			name: 'Balon przyciągający wodę',
			description: 'naelektryzowany balon przyciągający wodę, przyklejający się do ściany i przyciągający strumień wody - rzeczy: balon, woda'
		},
		{
			id: 'gravity-drag-paper',
			ingredientIDs: [
				'paper'
			],
			name: 'Grawitacja a opór',
			description: 'grawitacja niezależna od masy, ale kształtu i oporu powietrza - rzeczy: kartka'
		}
	]
};

ReactDOM.render(<App
	possibleIngredients={data.possibleIngredients}
	experiments={data.experiments}
/>,
document.getElementById('root')
);

