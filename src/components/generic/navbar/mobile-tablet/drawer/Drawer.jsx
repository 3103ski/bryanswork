// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { motion } from 'framer-motion';

// --> Project Imports
import { Button } from 'components';
import { motion_variants_nav } from 'util';
import { SURVEY } from 'icons';
import { REQUEST_QUOTE } from 'routes';

// --> Component Imports
import Style from './drawer.module.scss';

export default function Drawer({ open, toggle, children }) {
	return (
		<>
			<motion.div
				className={Style.DrawerWrapper}
				variants={motion_variants_nav.mobile}
				initial='drawerClosed'
				animate={open ? 'drawerOpen' : 'drawerClosed'}>
				{children}
				<div className={Style.ButtonWrapper}>
					<Button
						as={Link}
						to={REQUEST_QUOTE}
						className={Style.EstBtn}
						onClick={() => toggle(false)}
						icon={SURVEY}
						color='primary'>
						Project Survey
					</Button>
				</div>
			</motion.div>
			<div className={Style.Backdrop} onClick={() => toggle(false)} data-open={open ? 1 : 0} />
		</>
	);
}
