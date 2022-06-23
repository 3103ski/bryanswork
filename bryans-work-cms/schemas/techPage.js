export default {
	name: 'techContent',
	title: 'Tech Page Content',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'tech',
			title: 'Tech Used',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'tech' } }],
		},
	],
};
