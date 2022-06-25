// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Form } from 'semantic-ui-react';

// --> Project Imports
import { FormTitle, TextInput, Section, Button, TextArea } from 'components';
import { REQUEST_QUOTE } from 'routes';

// --> Component Imports
import Style from './contactFormSection.module.scss';

export default function ContactFormSection() {
	return (
		<div className={Style.Wrapper}>
			<Section>
				<Form id='contact_form' className={Style.Form}>
					<FormTitle>Quick Question? Reach out and I'll get back to you</FormTitle>
					<p>
						If you know what you want, you can <Link to={REQUEST_QUOTE}>fill out the project survey</Link>{' '}
						and let's get to planning your project!
					</p>
					<TextInput placeholder='Your Name' />
					<TextInput placeholder='Email Address' />
					<TextArea placeholder='Message' />
					<Button thin>Send Message</Button>
				</Form>
			</Section>
		</div>
	);
}
