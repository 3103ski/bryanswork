// --> React
import React from 'react';

// --> Project Imports
import { Tabs, Section } from 'components';

// --> Component Imports
import Style from './projectTabsSection.module.scss';

export default function ProjectTabsSection() {
	return (
		<Section className={Style.Container}>
			<Tabs
				tabs={['description', 'tech', 'mockups', 'other notes']}
				panels={[
					<div style={{ height: '400px' }}>
						<h1>panel 1</h1>
					</div>,
					<div style={{ height: '400px' }}>
						<h1>panel 2</h1>
					</div>,
					<div>
						<h1>panel 3</h1>
					</div>,
					<div>
						<h1>panel 4</h1>
					</div>,
				]}
			/>
		</Section>
	);
}
