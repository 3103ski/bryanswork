import { simpleDropMenu, yesNoQuestion, textInput, provideRating } from 'jsoforms';

export const formData = {
	panes: [
		// ==> Pane 1
		{
			display: {
				title: 'Get Started',
				subtext: `Let's start with a few initial details about you and the project.`,
			},
			inputs: {
				fullName: textInput({ placeholder: 'Your Name' }),
				email: textInput({ placeholder: 'Email' }),
				websiteName: textInput({ placeholder: `What's the working name of your app or website?` }),
				logo: yesNoQuestion(`Will you also need a logo designed for your project?`),
				projectType: simpleDropMenu({
					placeholder: 'What type of project to you need to make?',
					options: ['Web App', 'Website', { text: 'Not sure yet', value: 'unsure' }],
				}),
			},
		},
		// ==> Pane 2
		{
			dependsOnPreviousAnswer: true,
			removalLabel: 'Project Details',
			looksAt: 'projectType',
			paneOptions: [
				{
					display: {
						title: `Website Details`,
						subtext: `Just a few questions about the website`,
					},
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
					display: {
						title: `App Details`,
						subtext: `Just a few questions about the Web App`,
					},
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
		// ==> Pane 3
		{
			display: {
				title: `Web Design`,
				subtext: `A few quick things about looks`,
			},
			inputs: {
				artsyRating: provideRating({
					placeholder: `Rate your design hopes; 1 being strictly business, 10 being super artsy`,
				}),
				photography: simpleDropMenu({
					placeholder: `Do you have usable photography`,
					options: ['Few Good Ones', 'Decent amount of mixed quality', 'plenty of awesome pics'],
				}),
				shape: simpleDropMenu({
					placeholder: `Do you tend to like web design that is more boxy or round?`,
					options: ['Boxy', 'Round', 'No preference'],
				}),
			},
		},
		// ==> Pane 4
		{
			dependsOnPreviousAnswer: true,
			looksAt: 'logo',
			removalLabel: 'Logo Work',
			paneOptions: [
				{
					display: {
						title: `Logo Work`,
						subtext: `About that logo you mentioned earlier..`,
					},
					looksFor: 'yes',
					inputs: {
						logoStyle: simpleDropMenu({
							placeholder: `What sounds most like the logo you're looking for?`,
							options: [
								'Detailed, almost like a graphic or image',
								'Not detailed, but has a lot going on',
								'Something simple, like a symbol, no words.',
								'Something simple that uses my company letters',
							],
						}),
						logoAppreciation: textInput({
							placeholder: `Describe what you appreaciate about logos that you like (optional)`,
							validate: false,
						}),
					},
				},
			],
		},
	],
};
