import React = require('react');

interface IProps {
}

const CloseIndicator: React.FC<IProps> = (props) => {

	return <div className = "close-indicator_container">
		<div className = "close-indicator">✖</div>
	</div>;
};

export default CloseIndicator;