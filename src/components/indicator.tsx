import React = require('react');
import Dropdown from '../components/generic/dropdown/dropdown';

interface IProps {
	isTrue: boolean
}

const Indicator: React.FC<IProps> = (props) => {
	return <div
		className={'match-indicator ' + (props.isTrue ? 'true' : 'false')}
	>
		{props.children}

	</div>;
};

export default Indicator;