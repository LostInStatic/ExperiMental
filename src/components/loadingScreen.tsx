import React = require('react');
import { useData, TContextValue } from './dataProvider';
import ModalBox from './generic/modal/modalBox';
import LoadingGif from '../resources/loading.gif';

const LoadingScreen: React.FC = () => {
	const data = useData();

	return <ModalBox
		displayed={isDataLoading(data)}
		className="loading-screen"
	>
		<img src={LoadingGif} alt=""/>

	</ModalBox>;
};

export default LoadingScreen;

const isDataLoading = (data: TContextValue) => {
	return Object.values(data?.state || {}).some(entity => entity.status === 'loading');
};

const generateInformation = (data) => {

};
