// --> React
import React from 'react';

// --> Packages
import axios from 'axios';

// --> Project Imports
import { Loading } from 'components';
import { ReactJSOForm, FormSuccess } from 'jsoforms';
import { SERVER_SURVEY_FORMS } from 'routes';

// --> Component Imports
import Style from './surveyFormSection.module.scss';
import { formData } from './surveyFormData';

export default function ProjectSurveySection() {
	const [isLoading, toggleIsLoading] = React.useState(false);
	const [status, setStatus] = React.useState(null);
	function submitFormAPI(data) {
		toggleIsLoading(true);
		setStatus(null);

		const hdrs = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		axios({ url: SERVER_SURVEY_FORMS, method: 'post', hdrs, data })
			.then(({ data }) => {
				toggleIsLoading(false);
				console.log({ submitted: data });
				setStatus(data.message);
			})
			.catch((err) => {
				console.log(err);
				toggleIsLoading(false);
			});
	}

	return (
		<div className={Style.Wrapper}>
			{isLoading && <Loading size={'screen'} />}
			{status === 'success' && (
				<FormSuccess
					successText='Survey Submitted!'
					subtext={`Thanks for reaching out, I'll get back to you soon after I go over the info you submitted. Talk soon!`}
				/>
			)}
			<div style={{ width: '100%', display: isLoading || status === 'success' ? 'none' : 'inline-block' }}>
				<ReactJSOForm formObject={formData} callback={submitFormAPI} />
			</div>
		</div>
	);
}
