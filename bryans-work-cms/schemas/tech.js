export default {
	name: 'tech',
	title: 'Tech',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'icon',
			title: 'Icon Title (specific to react component)',
			type: 'string',
		},
		{
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'tag' } }],
		},
		{
			name: 'confidence',
			title: 'Confidence',
			type: 'number',
			options: {
				list: [1, 2, 3, 4, 5],
			},
		},
		{
			name: 'usage',
			title: 'Usage Frequency',
			type: 'number',
			options: {
				list: [1, 2, 3, 4, 5],
			},
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string',
		},
		{
			name: 'link',
			title: 'Tech Link',
			type: 'url',
		},
	],
	initialValue: {
		confidence: 3,
		usage: 1,
		tags: [],
	},
};
