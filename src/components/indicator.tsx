import React = require('react');

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