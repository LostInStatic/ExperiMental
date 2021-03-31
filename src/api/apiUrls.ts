const base = '/experimental-admin/web/jsonapi/';

const APIURLS = {
	ingredients: `${base}node/skladnik`,
	experiments: `${base}node/eksperyment`,
	rooms: `${base}node/pokoj`,
	textBlocks: `${base}node/blok_tekstu`,
	categories: `${base}node/kategoria`,
	mainCategorySlug: 'main',
	defaultCategorySlug: 'default'	
};
export default APIURLS;