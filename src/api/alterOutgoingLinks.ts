const alterOutgoingLinks = (htmlString:string) => {
	if (!htmlString) return '';
	return htmlString.replace('<a', '<a target="_blank" ');
};

export default alterOutgoingLinks;