import React = require('react');
import { IIngredientData } from './app';

interface IProps {
	attributes: IIngredientData,
	onClick: () => void
}

const Ingredient: React.FC<IProps> = (props) => {
	return <button
		className="ingredient"
		onClick={props.onClick}
	>
		<img src={
			props.attributes.iconUrls.color
		} alt="" />
		{props.attributes.name}
	</button>;
};

export default Ingredient;