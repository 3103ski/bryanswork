// --> React
import React from 'react';

// --> Project Imports
import { HomeLandingSection, NeedDeveloperSection, TechStackSection, ProjectsSection, LogoReel } from 'components';
import ViewWrapper from './ViewWrapper';

export default function HomePage() {
	return (
		<ViewWrapper>
			<HomeLandingSection />
			<TechStackSection />
			<LogoReel />
			<ProjectsSection />
			<NeedDeveloperSection />
		</ViewWrapper>
	);
}
