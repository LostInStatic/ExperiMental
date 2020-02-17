import React = require('react');

interface IProps {
	id: string,
	name: string
	onClick: () => void
}

const Ingredient: React.FC<IProps> = (props) => {
	return <button
		className="ingredient"
		onClick={props.onClick}
	>
		{props.name}
	</button>;
};

export default Ingredient;