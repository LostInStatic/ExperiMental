import React = require('react');
import { useData, TContextValue, TFetchStatus } from './dataProvider';
import ModalBox from './generic/modal/modalBox';
import LoadingGif from '../resources/loading.gif';

const LoadingScreen: React.FC = () => {
	const data = useData();

	React.useEffect( () => console.log(generateInformation(data)), [data]);

	return <ModalBox
		displayed={getDataLoading(data) || getFetchingError(data)}
		className="loading-screen"
	>
		<img src={LoadingGif} alt=""/>
		{getFetchingError(data) ? <p>Wystąpił błąd połączenia z serwerem.</p> : ''}

	</ModalBox>;
};

export default LoadingScreen;

const getDataLoading = (data: TContextValue) => {
	return Object.values(data?.state || {}).some(entity => entity.status === 'loading');
};

const getFetchingError = (data: TContextValue) => {
	return Object.values(data?.state || {}).some(entity => entity.status === 'error');
};

const generateInformation = (data: TContextValue) => {
	return Object.entries(data.state).map(([key, value]) => {
		const fields = {
			entity: parseEntityName(key as keyof TContextValue['state']),
			status: parseStatus(value.status)
		};
		return `${fields.entity}: ${fields.status}`;
	});
};

const parseEntityName = (key: keyof TContextValue['state']) => {
	switch (key) {
		case 'experiments' :
			return 'Eksperymenty';
		case 'ingredients' :
			return 'Składniki';
		case 'rooms' :
			return 'pokoje';
		default:
			break;
	}
};

const parseStatus = (status: TFetchStatus) => {
	switch (status) {
		case 'loaded':
			return 'OK!';
		case 'loading':
			return 'Pobieranie'	;
		default:
			return 'Ups! Spróbuj odświeżyć.';
			break;
	}
};