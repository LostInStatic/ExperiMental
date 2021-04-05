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
