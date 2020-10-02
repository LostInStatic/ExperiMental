const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('./service-worker.js')
				.then(registration => console.info('SW registered:', registration))
				.catch(error => console.error('SW registration failed', error));
		});
	}
};

export default registerServiceWorker;