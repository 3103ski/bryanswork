// --> React
import React from 'react';

// --> Project Imports
import { HomePageSection } from 'components';
import { EXPLORE_PROJECTS, EXPLORE_TECH } from 'routes';

// --> Component Imports
// import Style from './needDecSection.module.scss';

export default function NeedDevSection() {
	return (
		<HomePageSection
			title='See Some Work'
			text={`You can explore my full portfolio and easily find the compatible experience you're looking for by filtering down the tech. `}
			button1={{ text: `Browse My Projects`, route: EXPLORE_PROJECTS }}
			button2={{ text: `My Tech`, route: EXPLORE_TECH }}
			bottomBorder
		/>
	);
}
