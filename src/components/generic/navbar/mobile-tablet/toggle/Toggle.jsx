// --> React
import React from 'react';

// --> Packages
import { motion } from 'framer-motion';

// --> Project Imports
import { motion_variants_nav } from 'util';

// --> Component Imports
import Style from './toggle.module.scss';

export default function Toggle({ toggle, open }) {
	return (
		<motion.button
			className={Style.Toggle}
			animate={open ? 'toggleOpen' : 'toggleClosed'}
			variants={motion_variants_nav.mobile}
			onClick={toggle}>
			<ToggleIcon open={open} />
		</motion.button>
	);
}

function ToggleIcon({ open, iconSize = 27 }) {
	let animate = (open) => (open ? 'open' : 'closed');

	let path1vars = {
		closed: { d: 'M 2 2.5 L 20 2.5' },
		open: { d: 'M 3 16.5 L 17 2.5' },
	};
	let path2vars = {
		closed: { opacity: 1 },
		open: { opacity: 0 },
	};
	let path3vars = {
		closed: { d: 'M 2 16.346 L 20 16.346' },
		open: { d: 'M 3 2.5 L 17 16.346' },
	};

	return (
		<svg width={iconSize} height={iconSize} viewBox='0 0 23 23'>
			<Path animate={() => animate(open)} variants={path1vars} />
			<Path
				animate={() => animate(open)}
				d='M 2 9.423 L 20 9.423'
				variants={path2vars}
				transition={{ duration: 0.1 }}
			/>
			<Path animate={() => animate(open)} variants={path3vars} />
		</svg>
	);
}

function Path(props) {
	return <motion.path fill='transparent' strokeWidth='3' stroke='white' strokeLinecap='round' {...props} />;
}
