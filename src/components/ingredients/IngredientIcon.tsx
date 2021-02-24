import React = require('react');

interface IProps {
	iconUrl?: string,
	ingredientName: string,
	type: 'mono' | 'color'
}

const IngredientIcon: React.FC<IProps> = (props) => {
	if (props.iconUrl) {
		return <img
			className={'ingredient-icon ' + props.type}
			src={props.iconUrl}
		/>;
	} else {
		return <div
			className={'ingredient-icon placeholder ' + props.type}
		>
			<div>{props.ingredientName.substring(0, 3).toLowerCase()}</div>
		</div>;
	}


};

export default IngredientIcon;