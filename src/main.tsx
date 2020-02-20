
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';


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
const experiments = [
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
	},
	{
		id: 'pressure-water-escape',
		ingredientIDs: [
			'paper',
			'water',
			'pet-bottle'
		],
		name: 'Ciśnienie zatrzymujące ucieczkę wody',
		description: 'Ciśnienie zatrzymujące ucieczkę wody - rzeczy: kartka, woda, kubek/butelka'
	},
	{
		id: 'baloon-in-bottle',
		ingredientIDs: [
			'baloon',
			'pet-bottle'
		],
		name: 'balon w butelce',
		description: 'balon w butelce'
	},
	{
		id: 'pressure-bottle-paperball',
		ingredientIDs: [
			'paper',
			'pet-bottle'
		],
		name: 'wdmuchiwanie kulki do butelki',
		description: 'wdmuchiwanie kulki do butelki - rzeczy: butelka, papier'
	},
	{
		id: 'bottle-holes-levels',
		ingredientIDs: [
			'water',
			'pet-bottle',
			'scissors'
		],
		name: 'butelka z dziurami na różnym poziomie',
		description: 'butelka z dziurami na różnym poziomie - butelka, woda, nożyczki/pinezki'
	},
	{
		id: 'paper-under-water',
		ingredientIDs: [
			'paper',
			'water'
		],
		name: 'kartka pod wodą',
		description: 'kartka pod wodą - rzeczy: woda, butelka/kubek, papier, miska'
	},
	{
		id: 'bottle-holes-waterflow',
		ingredientIDs: [
			'water',
			'pet-bottle',
			'scissors'
		],
		name: 'butelka z dziurami i nie wypływająca woda',
		description: 'butelka z dziurami i nie wypływająca woda - rzeczy: woda, butelka, nożyczki/pinezka'
	},
	{
		id: 'compression-water-vs-air',
		ingredientIDs: [
			'pet-bottle',
			'pet-bottle',
			'water'
		],
		name: 'Co jest bardziej ściśliwe woda, czy powietrze ',
		description: 'Co jest bardziej ściśliwe woda, czy powietrze - rzeczy: butelka x 2, woda'
	},
	{
		id: 'thermodynamic-inflating-baloon',
		ingredientIDs: [
			'water',
			'heat',
			'baloon',
			'pet-bottle'
		],
		name: 'Balon, który sam się nadmuchuje',
		description: 'Balon, który sam się nadmuchuje - rzeczy: balon, woda (ciepła i zimna), miska, butelka'
	},
	{
		id: 'baloon-bursting',
		ingredientIDs: [
			'baloon',
			'scissors'
		],
		name: 'przebijanie balona',
		description: 'przebijanie balona - rzeczy: balon, nożyczki, pinezki'
	},
	{
		id: 'baloon-cover',
		ingredientIDs: [
			'baloon'
		],
		name: 'balon pokrowiec ',
		description: 'balon pokrowiec - rzeczy: balon'
	},
	{
		id: 'pressure-equalisation',
		ingredientIDs: [
			'baloon'
		],
		name: 'wyrównywanie ciśnień',
		description: 'wyrównywanie ciśnień (czy to nie jest zbyt banalne?) - rzeczy: balon'
	},
	{
		id: 'pressure-baloon-holding',
		ingredientIDs: [
			'baloon',
			'water',
			'pet-bottle'
		],
		name: 'balon trzymający szklanki/butelki',
		description: 'balon trzymający szklanki/butelki - rzeczy: szklanka/butelka/coś, woda, balon'
	}
];

ReactDOM.render(
	<App
		possibleIngredients={possibleIngredients}
		experiments={experiments}
	/>,
	document.getElementById('root')
);

