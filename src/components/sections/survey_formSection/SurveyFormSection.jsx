// --> React
import React from 'react';

// --> Project Imports
import { ProjectSurvey } from 'components';

// --> Component Imports
import Style from './surveyFormSection.module.scss';

export default function ProjectSurveySection() {
	return (
		<div className={Style.Wrapper}>
			<ProjectSurvey />
		</div>
	);
}
