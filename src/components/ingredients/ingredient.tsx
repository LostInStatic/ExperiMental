import React = require('react');
import { IIngredientsData } from '../../api/fetchIngredients';
import IngredientIcon from './IngredientIcon';

interface IProps {
	attributes: IIngredientsData,
	onClick: () => void
}

const Ingredient: React.FC<IProps> = (props) => {
	return <button
		className="ingredient"
		onClick={props.onClick}
	>
		<IngredientIcon
			ingredientName={props.attributes.name}
			iconUrl={props.attributes.iconUrls.color}
			type="color"
		/>
		<div className="ingredient-label">{props.attributes.name}</div>
	</button>;
};

export default Ingredient;