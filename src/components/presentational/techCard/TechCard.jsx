// --> React
import React from 'react';

// --> Project Imports
import { TechLogo } from 'components';

// --> Component Imports
import Style from './techCard.module.scss';

export function TechCard({ tech }) {
	function RatingBar({ label, rating }) {
		return (
			<div className={Style.RatingBar}>
				<div className={Style.LabelWrapper}>
					<p>{label}</p>
				</div>
				<div className={Style.MeterOuter}>
					<div className={Style.MeterInner} style={{ width: `${100 * ((rating / 10) * 2)}%` }}></div>
				</div>
			</div>
		);
	}

	return (
		<div className={Style.Wrapper}>
			<TechLogo logo={tech.tech} width='50px' />
			<h3>{tech.title}</h3>
			<p className={Style.Description}>{tech.description}</p>
			<RatingBar label={'Confidence'} rating={tech.confidence} />
			<RatingBar label={'Frequency Of Use'} rating={tech.usage} />
		</div>
	);
}

TechCard.Container = ({ children }) => {
	return <div className={Style.Container}>{children}</div>;
};
