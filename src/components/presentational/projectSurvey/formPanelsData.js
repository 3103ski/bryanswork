import { simpleDropMenu, yesNoQuestion, textInput, provideRating } from './formDataUtility';

export const formData = {
	panes: [
		// ==> Pane 1
		{
			fullName: textInput({ placeholder: 'Your Name' }),
			email: textInput({ placeholder: 'Email' }),
			projectType: simpleDropMenu({
				placeholder: 'What type of project to you need to make?',
				options: ['Web App', 'Website', { text: 'Not sure yet', value: 'unsure' }],
			}),
			logo: yesNoQuestion(`Will you also need a logo designed for your project?`),
		},
		// ==> Pane 2
		{
			dependsOnPreviousAnswer: true,
			looksAt: 'projectType',
			title: 'Project Details',
			paneOptions: [
				{
					looksFor: 'website',
					inputs: {
						updateFrequency: simpleDropMenu({
							placeholder: 'How often is the content updated?',
							options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
						}),
						whoUpdatesContent: simpleDropMenu({
							placeholder: 'Who will keep your content up to date?',
							options: [
								{
									text: 'I want to update and edit content myself',
									value: 'cms',
								},
								{
									text: 'I will pay a developer as needed',
									value: 'dev',
								},
							],
						}),
						isSelling: yesNoQuestion('Are you going to sell services and/or products?'),
						socialMedia: yesNoQuestion('Will you be integrating any social media accounts?'),
					},
				},
				{
					looksFor: 'webapp',
					inputs: {
						facesWho: simpleDropMenu({
							placeholder: `Is your app 'Peer to Peer' or will users consume info directly from you?`,
							options: [
								{ value: 'p2p', text: 'An app where users face other users' },
								{ value: 'clientFacing', text: 'An app where my business faces users' },
							],
						}),
						payments: yesNoQuestion(`Is your app going to be processing any type of payments?`),
						userProfiles: yesNoQuestion(`Will users be able to log in and manage a profile with your app?`),
					},
				},
			],
		},
		{
			artsyRating: provideRating({
				placeholder: `Rate your design hopes; 1 being strictly business, 10 being super artsy`,
			}),
		},
		// ==> Pane 3
		{
			dependsOnPreviousAnswer: true,
			looksAt: 'logo',
			title: 'Logo Work',
			paneOptions: [
				{
					looksFor: 'yes',
					inputs: {
						websiteName: textInput({ placeholder: `What's the name of your website` }),
						logoAppreciation: textInput({
							placeholder: `Describe what you appreaciate about logos that you like`,
						}),
					},
				},
				{
					looksFor: 'no',
					inputs: {
						appName: textInput({ placeholder: `What's the working name for your App` }),
					},
				},
			],
		},
	],
};
