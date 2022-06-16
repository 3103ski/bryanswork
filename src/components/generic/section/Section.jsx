// --> React
import React from 'react';

// --> Package Imports
import { Container } from 'semantic-ui-react';

// --> Component Imports
import Style from './section.module.scss';

export function Section({ className, children, ...rest }) {
	return (
		<Container as='section' className={`${Style.Wrapper} ${className}`} {...rest}>
			{children}
		</Container>
	);
}
