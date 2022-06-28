// --> React
import React from 'react';

// --> Project Imports
import { Footer } from 'components';
import { MotionViewWrapper } from 'util';

export default function ViewWrapper({ noFooter = null, children }) {
	return (
		// DEV NOTE --> View animations can be adjusted in 'src/util/framerMotion.js' file.
		<MotionViewWrapper>
			{children}
			{noFooter ? null : <Footer />}
		</MotionViewWrapper>
	);
}
