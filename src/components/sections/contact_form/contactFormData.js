import { textInput } from 'jsoforms';

export const contactFormData = {
	submitText: 'Send Message',
	panes: [
		// ==> Pane 1
		{
			display: {
				title: `Have questions?`,
				subtext: `If you have questions about work or working with me, send me a message here and I'll get back to you.`,
			},
			inputs: {
				fullName: textInput({ placeholder: 'Your Name' }),
				email: textInput({ placeholder: 'Email' }),
				message: textInput({ placeholder: 'Message' }),
			},
		},
	],
};
