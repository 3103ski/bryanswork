export default {
	name: 'workContent',
	title: 'Work Page Content',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'projects',
			title: 'Projects',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'project' } }],
		},
	],
};
