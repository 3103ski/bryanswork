// --> React
import React from 'react';

// Packages
import { Icon } from '@iconify/react';

// --> Project Imports
import { HOME, EXPLORE_PROJECTS, EXPLORE_TECH, REQUEST_QUOTE, NEED_WEBSITE, CONTACT } from 'routes';
import { Button, Modal } from 'components';
import { EMAIL, SURVEY } from 'icons';

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
					<Icon icon={EMAIL} />
				</div>
				<Modal isOpen={contactOpen} title={`Contact Me`} callback={toggleContactOpen}>
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
							icon={EMAIL}
							to={CONTACT}
							onClick={() => toggleContactOpen(false)}
							fluid
							space='10y'>
							Send A Message
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
