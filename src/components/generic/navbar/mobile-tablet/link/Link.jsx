// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { motion } from 'framer-motion';

// --> Project Imports
import { motion_variants_nav } from 'util';

// --> Component Imports
import Style from './link.module.scss';

export default function MobileLink({ children, toggle, to, ...rest }) {
	return to ? (
		<Link to={to} onClick={() => toggle(false)} className={Style.Link} {...rest}>
			{children}
		</Link>
	) : (
		<a onClick={() => toggle(false)} className={Style.Link} {...rest}>
			{children}
		</a>
	);
}

MobileLink.SectionLabel = ({ children, ...rest }) => {
	return (
		<p className={Style.SectionLabel} {...rest}>
			{children}
		</p>
	);
};

MobileLink.Container = ({ children, ...rest }) => {
	return (
		<motion.div className={Style.LinkContainer} variants={motion_variants_nav.mobile} {...rest}>
			{children}
		</motion.div>
	);
};
