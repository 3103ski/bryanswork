export default {
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'summary',
			title: 'Summary',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
		{
			name: 'projectLink',
			title: 'Project Link',
			type: 'url',
		},
		{
			name: 'projectType',
			title: 'Project Type',
			type: 'string',
			options: {
				list: ['Web App', 'Website', 'Exercise'],
			},
		},
		{
			name: 'year',
			title: 'Year Text',
			type: 'string',
		},
		{
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
		},
		{
			name: 'finishDate',
			title: 'Finish Date',
			type: 'date',
		},
		{
			name: 'category',
			title: 'Category',
			type: 'string',
		},
		{
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: ['in progress', 'completed', 'left incomplete'],
			},
		},
		{
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'tech',
			title: 'Tech Used',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'tech' } }],
		},
		{
			name: 'description',
			title: 'description',
			type: 'blockContent',
		},
		{
			name: 'mockups',
			title: 'Mockups',
			type: 'array',
			of: [{ type: 'image' }],
		},
	],
};
