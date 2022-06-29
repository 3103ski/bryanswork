// --> React
import React from 'react';

// --> Project Imports
import { ReactJSOForm } from 'jsoforms';

// --> Component Imports
import Style from './surveyFormSection.module.scss';
import { formData } from './formPanelsData';

export default function ProjectSurveySection() {
	function submitFormAPI(data) {
		console.log(data);
	}

	return (
		<div className={Style.Wrapper}>
			<ReactJSOForm formObject={formData} callback={submitFormAPI} />
		</div>
	);
}
