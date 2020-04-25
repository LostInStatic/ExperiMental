const getData = async (dataURL: string) => {
	let response = await fetch(dataURL).catch((error) => {
		console.error('There has been a problem with your fetch operation. URL: ', dataURL,'\nError message: ', error);
		return new Response(JSON.stringify({
		}));
	});
	let data = await response.json();
	return data;
};

export default getData;