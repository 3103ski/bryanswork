// --> React
import React from 'react';

// --> Project Imports
import { TechLogo, Section } from 'components';

// --> Component Imports
import Style from './logoReel.module.scss';

export function LogoReel() {
	let [logoWidth, logoMargin] = [67, 40];
	let tech = [
		'html',
		'sass',
		'js',
		'mongodb',
		'express',
		'react',
		'node',
		'netlify',
		'heroku',
		'apollo',
		'aws',
		'cloudinary',
		'figma',
		'gatsby',
		'graphql',
		'github',
		'npm',
		'sanity',
		'stripe',
		'vscode',
		'webflow',
		'wordpress',
	];

	return (
		<div
			className={Style.Outer}
			style={{
				'--total-logo-width': `-${tech.length * (logoWidth + logoMargin)}px`,
				'--double-logo-width': `${tech.length * (logoWidth + logoMargin) * 2}px`,
				'--animation-duration': `${tech.length * 1.5}s`,
			}}>
			<Section className={Style.Container}>
				<div className={Style.IconWrapper}>
					<div className={Style.IconInner} id='icon-inner'>
						{[...tech, ...tech].map((tech, i) => (
							<TechLogo
								key={`${tech}__${i}`}
								width={`${logoWidth}px`}
								logo={tech}
								style={{ marginRight: `${logoMargin}px` }}
							/>
						))}
					</div>
				</div>
			</Section>
			<div className={Style.ThinBar}>
				<Section style={{ height: '100%', backgroundColor: 'white' }} />
			</div>
		</div>
	);
}
