import React = require('react');
import { Link } from 'react-router-dom';
import { ICategoriesData } from '../../api/fetchCategories';
import { useData } from '../dataProvider';
import Dropdown from '../generic/dropdown/dropdown';
import Modal from '../generic/modal/modal';

interface IProps {

}

const CategorySelection: React.FC<IProps> = () => {
	const data = useData();
	const [modalDisplayed, setModalDisplayed] = React.useState(false);
	const [searchQuery, setSearchquery] = React.useState('');
	return <>
		<div className="category-search">
			<label htmlFor="category-search">Wyszukaj</label>
			<input type="text" name="category-search"
				onChange={e => setSearchquery(e.target.value)}
			/>
		</div>


		{generateCategoryLinks(
			data.state.categories.data,
			searchQuery,
			() => setModalDisplayed(false)
		)}
	</>;
};

export default CategorySelection;

const generateCategoryLinks = (
	categories: ICategoriesData[],
	searchQuery: string,
	closeModal: () => void) => {
	return <ul>
		{filterCategories(categories, searchQuery).map(category => {
			return <li key={`category_${category.urlSlug}`}>
				<Link
					to={`${category.urlSlug}`}
					onClick={closeModal}
				>{category.name}</Link>
			</li>;
		})
		}
	</ul>;
};

const filterCategories = (categories: ICategoriesData[], query: string) => {
	const regex = new RegExp(`.*${query}.*`, 'i');
	return categories.filter((category) => {
		return (
			(
				window.location.pathname.split('/').pop() !== category.urlSlug &&
				category.partialMatch && (
					regex.test(category.name) ||
					regex.test(category.urlSlug)
				)
			) ||
			(
				category.urlSlug === query
			)
		);
	});
};
