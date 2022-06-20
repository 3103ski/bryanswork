// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// --> Project Imports
import { CARROT_DOWN } from 'icons';
import { motion_variants_nav } from 'util';

// --> Component Imports
import Style from './dropMenu.module.scss';

export default function DropMenu({ links = [], children }) {
	const [isHovering, toggleIsHovering] = React.useState(false);

	return (
		<motion.div
			className={Style.DropMenuContainer}
			variants={motion_variants_nav.desktop}
			onHoverStart={() => toggleIsHovering(true)}
			onHoverEnd={() => toggleIsHovering(false)}>
			<div className={Style.DropMenuLabel}>
				<p className={Style.Label}>{children}</p>
				<Icon icon={CARROT_DOWN} />
			</div>
			<motion.div
				className={Style.DropLinksWrapper}
				variants={motion_variants_nav.desktop}
				animate={isHovering ? 'dropOpen' : 'dropClosed'}>
				{links.map((link, i) => (
					<DropMenu.Link
						key={`${i}__DropLink__${link.label}`}
						to={link.to}
						onClick={() => toggleIsHovering(false)}>
						{link.label}
					</DropMenu.Link>
				))}
			</motion.div>
		</motion.div>
	);
}

DropMenu.Link = ({ onClick, to = '/', children }) => (
	<Link onClick={onClick} to={to} className={Style.DropLink}>
		<motion.div>{children}</motion.div>
	</Link>
);
