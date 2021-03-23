import React = require('react');
import { IIngredientsData } from '../../api/fetchIngredients';
import Ingredient from './ingredient';

interface IProps {
	ingredients: IIngredientsData[],
	callback: (id: string) => void
}

const IngredientChoice: React.FC<IProps> = (props) => {

	return <div
		className="ingredient-choice">
		{listIngredients(props.ingredients, props.callback)}
	</div>;
};

const listIngredients = (list: IIngredientsData[], callback: (id: string) => void) => {
	if (!list) return <div></div>;
	
	return list.map((ingredientData) => {
		return <Ingredient
			key={ingredientData.id}
			attributes={ingredientData}
			onClick={() => { callback(ingredientData.id); }}
		/>;
	});
};

export default IngredientChoice;