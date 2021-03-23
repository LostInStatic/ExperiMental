
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';
import getExperiments from './ExperimentsList';
import fetchRooms from './api/fetchRooms';

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

fetchRooms(['d12a373c-ab08-458b-ba23-241b8a8343ef']).then(
	(rooms) => {
		ReactDOM.render(
			<App
				defaultRoom={rooms[0]}
			/>,
			document.getElementById('root')
		);
	}
);
