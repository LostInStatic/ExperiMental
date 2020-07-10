import React = require('react');
import './closeIndicator.scss';

interface IProps {
}

const CloseIndicator: React.FC<IProps> = (props) => {

	return <div className = "close-indicator_container">
		<div className = "close-indicator">✖</div>
	</div>;
};

export default CloseIndicator;