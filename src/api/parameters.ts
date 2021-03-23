interface IOpts {
	specificIds?: TIdsOrAll,
	includeIcons?: boolean
}

export type TIdsOrAll = string[] | 'all'

const addAPIParameters = (opts:IOpts) => {
	if (Object.keys(opts).length === 0) return '';
	let parameterStrings = [];

	if (opts.specificIds !== 'all') {
		parameterStrings.push(
			idsToParameters(opts.specificIds)
		);
	}
	if (opts.includeIcons) parameterStrings.push(includeIcons);

	return`?${parameterStrings.join('&')}`;
};

export default addAPIParameters;



const idsToParameters = (ids: string[]) => {
	const idFilters = ids.map(
		(id, index) => `filter[id-filter][condition][value][${index + 1}]=${id}`
	).join('&');

	return `
		filter[id-filter][condition][path]=id&
		filter[id-filter][condition][operator]=IN&
		${idFilters}
	`;
};

const includeIcons = 'include=field_ikona_mono,field_ikona&jsonapi_include=1';