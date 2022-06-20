// --> React
import React from 'react';

// --> Project Imports
import { HomeLandingSection, NeedDeveloperSection, TechStackSection, LogoReel } from 'components';
import ViewWrapper from './ViewWrapper';

export default function HomePage() {
	return (
		<ViewWrapper>
			<HomeLandingSection />
			<NeedDeveloperSection />
			<LogoReel />
			<TechStackSection />
		</ViewWrapper>
	);
}
