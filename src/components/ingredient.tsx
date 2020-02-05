import React = require('react');

interface IProps {
	name: string,
	onClick: () => void
}

const Ingredient: React.FC<IProps> = (props) => {
	return <button
		className="ingredient"
		onClick={props.onClick}
	/>;
};

export default Ingredient;