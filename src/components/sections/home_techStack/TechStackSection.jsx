// --> React
import React from 'react';

// --> Project Imports
import { TechLogo, HomePageSection } from 'components';

import { EXPLORE_TECH } from 'routes';

// --> Component Imports
// import Style from './techStackSection.module.scss';

export default function TechStackSection() {
	let priamryStack = ['mongodb', 'express', 'react', 'node', 'graphql'];
	return (
		<HomePageSection
			title='Primary Tech Stack'
			text='I focus primarily on creating websites and web apps using React JS, Node, Express, and
		MongoDB. I have a passion for developement and love exploring other tools and tech when
		I have free time.'
			button1={{ text: `Explore Other Things I've Used`, route: EXPLORE_TECH }}
			button2={{ text: `Read About My Practices`, route: EXPLORE_TECH }}>
			{priamryStack.map((tech, i) => (
				<TechLogo width='30px' key={`${i}_${tech}__${i}`} style={{ margin: '0 5px 10px 5px' }} logo={tech} />
			))}
		</HomePageSection>
	);
}
