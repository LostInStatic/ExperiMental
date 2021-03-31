import React = require('react');
import { useParams } from 'react-router-dom';
import APIURLS from '../../api/apiUrls';
import { ICategoriesData } from '../../api/fetchCategories';
import App from '../app';
import { useData } from '../dataProvider';

interface IProps {
}

const Category: React.FC<IProps> = (props) => {
	const { slug } = useParams() as { slug: string };
	const data = useData();
	const [currentIds, setCurrentIds] = React.useState({ rooms: [], textBlocks: [] });
	React.useEffect(() => data.request.categories('all'), []);
	React.useEffect(() => setCurrentIds(selectData(slug, data.state.categories.data)), [data.state.categories, slug]);
	return <App
		roomIds={currentIds.rooms}
		textBlockIds={currentIds.textBlocks}
	/>;
};

export default Category;

const selectData = (slug: string, categories: ICategoriesData[]) => {
	if (categories.length === 0) return { rooms: [], textBlocks: [] };
	if (!slug) slug = APIURLS.defaultCategorySlug;
	const currentCategory = categories.filter(
		category => category.urlSlug === slug
	)[0] || { roomIds: [], textBlockIds: [] };
	const mainCategory = categories.filter(
		category => category.urlSlug === APIURLS.mainCategorySlug
	)[0] || { roomIds: [], textBlockIds: []};

	return {
		rooms: [...currentCategory.roomIds, ...mainCategory.roomIds],
		textBlocks: [...currentCategory.textBlockIds, ...mainCategory.textBlockIds]
	};
};

