// --> React
import React from 'react';

// --> Project Imports
import { HomePageSection } from 'components';
import { REQUEST_QUOTE, CONTACT } from 'routes';

// --> Component Imports
// import Style from './needDecSection.module.scss';

export default function NeedDevSection() {
	return (
		<HomePageSection
			title='Need A Developer ?'
			text='If you need a website or web app, you can get an estimate by filling out a quote form.
			Feel free to contact me with questions'
			button1={{ text: `Project Survey`, route: REQUEST_QUOTE }}
			button2={{ text: `Message Me`, route: CONTACT }}></HomePageSection>
	);
}
