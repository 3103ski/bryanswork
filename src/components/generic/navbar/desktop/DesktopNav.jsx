// --> React
import React from 'react';

// --> Packages
import { motion } from 'framer-motion';

// --> Project Imports
import { motion_variants_nav } from 'util';
// import { Button } from 'components';
import { HOME, ABOUT } from 'routes';

// --> Component Imports
// import NavBranding from './branding/Branding';
import DropMenu from './links/dropMenu/DropMenu';
import RootLink from './links/rootLink/RootLink';
import Style from './desktopNav.module.scss';

export default function DesktopNav({ services }) {
	const [scrolled, setScrolled] = React.useState(false);

	const handleOnScroll = React.useCallback(() => {
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		if (winScroll > window.innerHeight * 0.4 && scrolled === false) {
			setScrolled(true);
		} else if (winScroll <= window.innerHeight * 0.4 && scrolled === true) {
			setScrolled(false);
		}
	}, [scrolled]);

	React.useEffect(() => {
		window.addEventListener('scroll', handleOnScroll);
		return () => window.removeEventListener('scroll', handleOnScroll);
	}, [handleOnScroll, scrolled]);

	return (
		<div className={Style.Container}>
			<motion.nav
				className={Style.ContainerInner}
				data-scrolled={scrolled ? 1 : 0}
				animate={scrolled === true ? 'shortNav' : 'tallNav'}
				variants={motion_variants_nav.desktop}>
				<div className={Style.CenterLinks}>
					<DropMenu
						links={[
							{ label: 'Videos', to: ABOUT },
							{ label: 'Our Work', to: ABOUT },
						]}>
						Explore
					</DropMenu>
					<RootLink to={HOME}>Need A Website?</RootLink>
				</div>
				<div className={Style.RightLinks}></div>
			</motion.nav>
		</div>
	);
}
