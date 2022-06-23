// --> React
import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

// --> Packages
import { AnimatePresence } from 'framer-motion';

// --> Project Imports
import { scrollToTopOf } from 'util';
import { HOME, EXPLORE_PROJECTS, EXPLORE_TECH, PROJECT_PAGE } from 'routes';
import { HomePage, ExploreProjectsPage, ExploreTechPage, ProjectTemplatePage } from './components';

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		// DEV NOTE --> View animations can be adjusted in 'src/util/framerMotion.js' file.
		<AnimatePresence exitBeforeEnter onExitComplete={() => scrollToTopOf()}>
			<Routes location={location} key={location.pathname}>
				<Route exact path={HOME} element={<HomePage />} />
				<Route exact path={EXPLORE_PROJECTS} element={<ExploreProjectsPage />} />
				<Route exact path={EXPLORE_TECH} element={<ExploreTechPage />} />
				<Route exact path={`${PROJECT_PAGE}/:slug`} element={<ProjectTemplatePage />} />
			</Routes>
		</AnimatePresence>
	);
}
