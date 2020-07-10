import React = require('react');
import Dropdown from '../components/generic/dropdown/dropdown';

interface IProps {
	state: 'good'|'bad'|'neutral'
}

const Indicator: React.FC<IProps> = (props) => {
	return <div
		className={'match-indicator ' + (props.state)}
	>
		{props.children}

	</div>;
};

export default Indicator;