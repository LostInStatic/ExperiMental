import React = require('react');

interface IProps {
	isTrue: boolean
}

const Indicator: React.FC<IProps> = (props) => {
	return <div
		className={'match-indicator ' + (props.isTrue ? 'true' : 'false')}
	>
		{props.isTrue ? 'OK!' : ''}
	</div>;
};

export default Indicator;