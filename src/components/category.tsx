import React = require('react');
import APIURLS from '../api/apiUrls';
import { ICategoriesData } from '../api/fetchCategories';
import App from './app';
import { useData } from './dataProvider';

interface IProps {
}

const Category: React.FC<IProps> = (props) => {
	const urlParams = new URLSearchParams(window.location.search);
	const data = useData();
	const [currentIds, setCurrentIds] = React.useState({rooms: [], textBlocks: []});
	React.useEffect( () => setCurrentIds( selectData(urlParams.get('cat'), data.state.categories.data)), [data.state.categories]); 
	return <App
		roomIds={currentIds.rooms}
		textBlockIds={currentIds.textBlocks}
	/> ;
};

export default Category;

const selectData = (slug: string, categories: ICategoriesData[]) => {
	if (categories.length === 0) return {rooms: [], textBlocks: []};
	const currentCategory = categories.filter(category => category.urlSlug === slug)[0];
	const mainCategory = categories.filter(category => category.urlSlug === APIURLS.mainCategoryQuery)[0];

	return {
		rooms: [...currentCategory.roomIds, ...mainCategory.roomIds],
		textBlocks: [...currentCategory.textBlockIds, ...mainCategory.textBlockIds]
	};
}; 