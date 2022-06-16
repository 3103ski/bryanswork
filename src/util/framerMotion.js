// --> React
import React from 'react';

// --> Packages
import { motion } from 'framer-motion';

// --> SASS
import Sass from '../sass/index.scss';

/**
 * This project uses Framer Motion package to help with animating React components.
 * Read docs for more info: https://www.framer.com/docs/introduction/
 */

//••••••••••••••••••••••••••••••••••••
// *** Variants --> Views
//••••••••••••••••••••••••••••••••••••

// Initial View State
const viewInitial = { y: '10px', opacity: 0.2 };

// View Transitions
const animatePageEnter = {
	y: 0,
	opacity: 1,
	transitionTimingFunction: 'ease-in-out',
};

const animatePageExit = {
	transition: { delay: 0.1 },
	opacity: 0,
	y: '10px',
	transitionTimingFunction: 'ease-in-out',
};

// View Wrapper
export function MotionViewWrapper({ children }) {
	return (
		<motion.div
			transition={{ duration: 0.2 }}
			initial={viewInitial}
			animate={animatePageEnter}
			exit={animatePageExit}>
			{children}
		</motion.div>
	);
}

//••••••••••••••••••••••••••••••••••••
// *** Variants --> NavBar
//••••••••••••••••••••••••••••••••••••

export const motion_variants_nav = {
	mobile: {
		drawerClosed: { x: '-100%' },
		drawerOpen: { x: '0%' },
		toggleClosed: { backgroundColor: Sass.color_primaryTransp },
		toggleOpen: { backgroundColor: 'rgba(0,0,0,0)' },
	},
	desktop: {
		shortNav: { height: Sass.sizes_nav_dt_short },
		tallNav: { height: Sass.sizes_nav_dt_tall },
		brandNoScroll: { width: '20vw' },
		brandScroll: { width: '12vw' },
		onBrandHover: { scale: 1.075 },
		dropOpen: { display: 'flex', opacity: 1, top: '100%' },
		dropClosed: { display: 'none', opacity: 0, top: '120%' },
		rootLinkHover: {
			backgroundColor: Sass.color_primaryTransp,
			transition: { ease: 'easeIn', damping: 0 },
		},
	},
};
