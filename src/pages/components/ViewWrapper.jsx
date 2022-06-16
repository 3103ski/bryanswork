// --> React
import React from 'react';

// --> Project Imports
import { MotionViewWrapper } from 'util';

export default function ViewWrapper({ children }) {
	return (
		// DEV NOTE --> View animations can be adjusted in 'src/util/framerMotion.js' file.
		<MotionViewWrapper>{children}</MotionViewWrapper>
	);
}
