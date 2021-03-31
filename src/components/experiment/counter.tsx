import React = require('react');
import { IExperimentsData } from '../../api/fetchExperiments';
import { useData } from '../dataProvider';

interface IProps {
	matchedExperiments: IExperimentsData[];
}

const Counter: React.FC<IProps> = (props) => {
	const data = useData();
	const [matched, update] = React.useReducer(addNewlyMatched, {});
	
	React.useEffect(
		() => update(props.matchedExperiments),
		[props.matchedExperiments]
	);	
	
	return <div className="experiments-counter">
		{`${Object.keys(matched).length}/${data.state.experiments.data.length}`}
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