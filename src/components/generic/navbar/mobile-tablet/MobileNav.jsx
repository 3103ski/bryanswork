// --> React
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// Packages
import { Icon } from '@iconify/react';

// --> Project Imports
import { HOME, EXPLORE_PROJECTS, EXPLORE_TECH, REQUEST_QUOTE, NEED_WEBSITE, CONTACT } from 'routes';
import { Button, Modal } from 'components';
import { PHONE, SURVEY } from 'icons';

// --> Components Imports
import Drawer from './drawer/Drawer';
import Link from './link/Link.jsx';
import Style from './mobileNav.module.scss';
import Toggle from './toggle/Toggle.jsx';
import BackBtn from './backBtn/BackBtn';

export default function MobileNav() {
	const [open, toggleOpen] = React.useState(false);
	const [contactOpen, toggleContactOpen] = React.useState(false);

	const ToggleLink = ({ to, children }) => (
		<Link toggle={toggleOpen} to={to}>
			{children}
		</Link>
	);

	return (
		<>
			<div className={Style.ContactWrapper} data-toggle-open={open ? 1 : 0}>
				<div className={Style.ContactBtn} onClick={() => toggleContactOpen(true)}>
					<Icon icon={PHONE} />
				</div>
				<Modal isOpen={contactOpen} title={`Let's Work`} callback={toggleContactOpen}>
					<Button.FluidWrapper>
						<Button
							as={Link}
							icon={SURVEY}
							to={REQUEST_QUOTE}
							onClick={() => toggleContactOpen(false)}
							fluid
							space='10y'>
							Project Survey
						</Button>
						<Button
							as={Link}
							icon={PHONE}
							to={CONTACT}
							onClick={() => toggleContactOpen(false)}
							fluid
							space='10y'>
							Contact Me
						</Button>
					</Button.FluidWrapper>
				</Modal>
			</div>
			<Toggle toggle={() => toggleOpen(!open)} open={open} />
			<BackBtn menuOpen={open} />
			<div className={Style.Container}>
				<Drawer open={open} toggle={toggleOpen}>
					<Link.Container>
						<ToggleLink to={HOME}>Home</ToggleLink>
						<ToggleLink to={EXPLORE_PROJECTS}>My Work</ToggleLink>
						<ToggleLink to={EXPLORE_TECH}>Tech I've Used</ToggleLink>
						<ToggleLink to={NEED_WEBSITE}>Need A Website?</ToggleLink>
					</Link.Container>
				</Drawer>
			</div>
		</>
	);
}
