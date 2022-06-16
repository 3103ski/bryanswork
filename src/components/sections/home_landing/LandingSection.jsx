// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Project Imports
import { Section, Button } from 'components';
import { ABOUT } from 'routes';

// --> Component Imports
// import Style from './landingSection.module.scss';  // use for more specific section styles
import ShareStyle from '../shared.module.scss';

export default function HomeLandingSection() {
	return (
		<Section className={ShareStyle.Wrapper}>
			<h1>Home Page</h1>
			<h3>The home page for the website</h3>
			<Button as={Link} to={ABOUT} color='primary'>
				Check about page
			</Button>
		</Section>
	);
}
