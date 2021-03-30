import React = require('react');
import { Link } from 'react-router-dom';
import { ICategoriesData } from '../../api/fetchCategories';
import { useData } from '../dataProvider';
import Modal from '../generic/modal/modal';

interface IProps {

}

const CategorySelection: React.FC<IProps> = () => {
	const data = useData();
	const [modalDisplayed, setModalDisplayed] = React.useState(false);
	return <Modal
		buttonSymbol="Zmień kategorię"
		externalState={
			{
				displayed: modalDisplayed,
				manageExternalState: setModalDisplayed
			}
		}
		className="category-choice"
	>
		{generateCategoryLinks(
			data.state.categories.data,
			() => setModalDisplayed(false)
		)}
	</Modal>;
};

export default CategorySelection;

const generateCategoryLinks = (categories: ICategoriesData[], closeModal) => {
	return <ul>
		{categories.map(category => {
			return <li key={`category_${category.urlSlug}`}>
				<Link
					to={`/${category.urlSlug}`}
					onClick={closeModal}
				>{category.name}</Link>
			</li>;
		})
		}
	</ul>;
};