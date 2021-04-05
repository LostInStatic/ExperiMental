import React = require('react');
import { IExperimentsData } from '../../api/fetchExperiments';
import CookiesProvider from '../../cookiesProvider';
import { useData } from '../dataProvider';

interface IProps {
	seen: number
}

const Counter: React.FC<IProps> = (props) => {
	const data = useData();

	return <div className="experiments-counter">
		{`${props.seen}/${data.state.experiments.data.length}`}
	</div>;
};

export default Counter;

const addNewlyMatched = (previous, experiments: IExperimentsData[]) => {
	const matched = {};
	experiments.map( (experiment) => {
		matched[experiment.id] = true;
	});
	return {...previous, ...matched};
};

const getSeenExperimentsCount = (experiments: IExperimentsData[]) => {
	return experiments.filter(
		experiment => {
			return CookiesProvider.get(`experiment-seen${experiment.id}`) === 'true';
		}
	).length;
};