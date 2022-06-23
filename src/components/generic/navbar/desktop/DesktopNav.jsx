// --> React
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// --> Packages
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// --> Project Imports
import { motion_variants_nav } from 'util';
// import { Button } from 'components';
import { HOME, EXPLORE_PROJECTS, EXPLORE_TECH } from 'routes';
import { BACK_ARROW } from 'icons';

// --> Component Imports
// import NavBranding from './branding/Branding';
import DropMenu from './links/dropMenu/DropMenu';
import RootLink from './links/rootLink/RootLink';
import Style from './desktopNav.module.scss';

export default function DesktopNav({ services }) {
	const [scrolled, setScrolled] = React.useState(false);
	const location = useLocation();
	const navigate = useNavigate();

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
				data-is-home={location.pathname === HOME ? 1 : 0}
				variants={motion_variants_nav.desktop}>
				<div
					className={Style.BackButton}
					onClick={() => navigate(-1)}
					data-is-home={location.pathname === HOME ? 1 : 0}>
					<div className={Style.BtnContent}>
						<Icon icon={BACK_ARROW} />
						<p>Back</p>
					</div>
					<svg width={'100%'} height={'100%'}>
						<path d='M 0 0 l 100 0 q 0 100 -100 100 l -100 0 ' fill={Style.color_primary} />
					</svg>
				</div>
				<div className={Style.CenterLinks}>
					<DropMenu
						links={[
							{ label: 'Projects', to: EXPLORE_PROJECTS },
							{ label: 'Tech Experience', to: EXPLORE_TECH },
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
