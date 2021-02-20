import React = require('react');
import Ingredient from '../ingredient';
import { IIngredientData } from '../app';

interface IProps {
	ingredients: IIngredientData[],
	callback: (id: string) => void
}

const IngredientChoice: React.FC<IProps> = (props) => {

	return <div
		className="ingredient-choice">
		{listIngredients(props.ingredients, props.callback)}
	</div>;
};

const listIngredients = (list: IIngredientData[], callback: (id: string) => void) => {
	return list.map((ingredient) => {
		return <Ingredient
			key={ingredient.id}
			id={ingredient.id}
			name={ingredient.name}
			onClick={() => { callback(ingredient.id); }}
		/>;
	});
};

export default IngredientChoice;