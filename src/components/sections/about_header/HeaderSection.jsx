// --> React
import React from 'react';

// --> Project Imports
import { Section } from 'components/generic';

// --> Component Imports
// import Style from './headerSection.module.scss';
import ShareStyle from '../shared.module.scss';

export default function AboutHeaderSection() {
	return (
		<Section className={ShareStyle.Wrapper}>
			<h1>About Us</h1>
			<h3>The about page for the website</h3>
		</Section>
	);
}
