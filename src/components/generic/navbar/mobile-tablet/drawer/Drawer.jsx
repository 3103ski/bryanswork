// --> React
import React from 'react';
// import { Link } from 'react-router-dom';

// --> Packages
import { motion } from 'framer-motion';

// --> Project Imports
// import { Button } from 'components';
import { motion_variants_nav } from 'util';
// import { LEAF } from 'icons';
// import { ESTIMATE } from 'routes';

// --> Component Imports
import Style from './drawer.module.scss';

export default function Drawer({ open, toggle, children }) {
	return (
		<>
			<motion.div
				className={Style.DrawerWrapper}
				variants={motion_variants_nav.mobile}
				animate={open ? 'drawerOpen' : 'drawerClosed'}>
				<div style={{ position: 'absolute', right: '20px', top: '20px' }}>
					{/* <Button
						as={Link}
						to={ESTIMATE}
						className={Style.EstBtn}
						onClick={() => toggle(false)}
						icon={LEAF}
						thin
						color='secondary'>
						Request Estimate
					</Button> */}
				</div>
				{children}
			</motion.div>
			<div className={Style.Backdrop} onClick={() => toggle(false)} data-open={open ? 1 : 0} />
		</>
	);
}
