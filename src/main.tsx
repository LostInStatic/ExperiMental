
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';
import getExperiments from './ExperimentsList';
import getData from './getData';

const experiments = getExperiments();

//@ts-ignore
import iconBalloonC from './resources/ingredient-icons/ikona-kolor-balon.svg';
//@ts-ignore
import iconBalloonM from './resources/ingredient-icons/ikona-mono-balon.svg';
//@ts-ignore
import iconScissC from './resources/ingredient-icons/ikona-kolor-no¾yczki.svg';
//@ts-ignore
import iconScissM from './resources/ingredient-icons/ikona-mono-no¾yczki.svg';
//@ts-ignore
import iconWaterC from './resources/ingredient-icons/ikona-kolor-woda.svg';
//@ts-ignore
import iconWaterM from './resources/ingredient-icons/ikony-mono-woda.svg';
//@ts-ignore
import iconSBottM from './resources/ingredient-icons/ikona-mono-butelka.svg';
//@ts-ignore
import iconBottC from './resources/ingredient-icons/ikona-kolor-burelka.svg';
//@ts-ignore
import iconPapC from './resources/ingredient-icons/ikona-kolor-papier.svg';
//@ts-ignore
import iconPapM from './resources/ingredient-icons/ikona-mono-papier.svg';


/// #if PRODUCTION
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
/// #else
console.info('devbuild');
/// #endif



const possibleIngredientsFallback = [
	{
		id: 'water',
		name: 'Woda',
		iconUrls: {
			mono: iconWaterM,
			color: iconWaterC
		}
	},
	{
		id: 'paper',
		name: 'Papier',
		iconUrls: {
			mono: iconPapM,
			color: iconPapC
		}
	},
	{
		id: 'balloon',
		name: 'Balon',
		iconUrls: {
			mono: iconBalloonM,
			color: iconBalloonC
		}
	},
	{
		id: 'pet-bottle',
		name: 'Butelka',
		iconUrls: {
			mono: iconSBottM,
			color: iconBottC
		}
	},
	{
		id: 'scissors',
		name: 'Nożyczki',
		iconUrls: {
			mono: iconScissM,
			color: iconScissC
		}
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
		/>,
		document.getElementById('root')
	);

});



