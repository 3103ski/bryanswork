// --> React
import React from 'react';

// --> Project Imports
import { SurveyFormSection, Section } from 'components';

// --> Component Imports
import ViewWrapper from './ViewWrapper';

export default function ProjectSurveyPage() {
	return (
		<ViewWrapper noFooter>
			<Section>
				<SurveyFormSection />
			</Section>
		</ViewWrapper>
	);
}
