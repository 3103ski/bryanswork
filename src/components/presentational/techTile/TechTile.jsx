// --> React
import React from 'react';

// --> Project Imports
import { TechLogo } from 'components';

// --> Component Imports
import Style from './techTile.module.scss';

export function TechTile({ tech }) {
	return (
		<div className={Style.Wrapper}>
			<div className={Style.LogoWrapper}>
				<TechLogo logo={tech.icon} />
			</div>
			<p>{tech.title}</p>
		</div>
	);
}
