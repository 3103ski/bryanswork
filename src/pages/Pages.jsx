// --> React
import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

// --> Packages
import { AnimatePresence } from 'framer-motion';

// --> Project Imports
import { scrollToTopOf } from 'util';
import { HOME, ABOUT } from 'routes';
import { HomePage, AboutPage } from './components';

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		// DEV NOTE --> View animations can be adjusted in 'src/util/framerMotion.js' file.
		<AnimatePresence exitBeforeEnter onExitComplete={() => scrollToTopOf('app')}>
			<Routes location={location} key={location.pathname}>
				<Route exact path={HOME} element={<HomePage />} />
				<Route exact path={ABOUT} element={<AboutPage />} />
			</Routes>
		</AnimatePresence>
	);
}
