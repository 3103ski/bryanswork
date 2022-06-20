// --> React
import React from 'react';

// --> Project Imports
// import { fetchServiceSlugs } from 'groq';
// import { checkSeshStorageAddIfNeeded } from 'util';

// --> Component Imports
import MobileNav from './mobile-tablet/MobileNav';
import DesktopNav from './desktop/DesktopNav';

/**
 * DEV NOTE : For info on framer motion, see nav variants in '/src/util/framerMotion.js'
 */

export function Navbar() {
	return (
		<>
			<DesktopNav />
			<MobileNav />
		</>
	);
}
