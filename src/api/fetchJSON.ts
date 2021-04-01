const fetchJSON = async <T> (dataURL: string): Promise<T> => {
	const response = await fetch(dataURL).catch(error => {
		return handleError(error, dataURL);
	});
	const data = await response.json().catch(error => {
		return handleError(error, dataURL, true);
	});
	return data;
};

export default fetchJSON;


const handleError = (error: any, URL: string, isInParsingJSON?: boolean):Response => {
	const stage = isInParsingJSON ? 'parsing JSON' : 'fetching data' ;
	console.error(`There has been a problem with fetching data.\nStage: ${stage}\nURL: ${URL}\nError: ${error}`);
	return new Response(JSON.stringify({}));
};
