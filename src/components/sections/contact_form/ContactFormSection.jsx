// --> React
import React from 'react';
// import { Link } from 'react-router-dom';

// --> Packages
import { ReactJSOForm, textInput } from 'jsoforms';

// --> Project Imports
import { Section } from 'components';
// import { REQUEST_QUOTE } from 'routes';

// --> Component Imports
import Style from './contactFormSection.module.scss';

export default function ContactFormSection() {
	function onSubmitContact(data) {
		console.log(data);
	}
	return (
		<div className={Style.Wrapper}>
			<Section>
				<ReactJSOForm
					formObject={{
						panes: [
							{
								display: {
									title: `Quick Question? Reach out and I'll get back to you`,
								},
								inputs: {
									name: textInput({ placeholder: 'Your Name' }),
									email: textInput({ placeholder: 'Email Address' }),
								},
							},
						],
					}}
					callback={onSubmitContact}
				/>
			</Section>
		</div>
	);
}
