
import ReactDOM = require('react-dom')
import React = require('react')
import './style.scss';
import App from './components/app';
import fetchRooms from './api/fetchRooms';

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
