// --> React
import React from 'react';

// --> Packages
import { Form } from 'semantic-ui-react';

// --> Project Imports
import { FormTitle, TextInput, Section, Button, TextArea } from 'components';

// --> Component Imports
import Style from './contactFormSection.module.scss';

export default function ContactFormSection() {
	return (
		<div className={Style.Wrapper}>
			<Section>
				<Form id='contact_form' className={Style.Form}>
					<FormTitle>Quick Question? Reach out and I'll get back to you!</FormTitle>
					<TextInput placeholder='Your Name' />
					<TextInput placeholder='Email Address' />
					<TextArea placeholder='Message' />
					<Button thin>Send Message</Button>
				</Form>
			</Section>
		</div>
	);
}
