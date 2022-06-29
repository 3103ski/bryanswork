// --> React
import React from 'react';
// import { Link } from 'react-router-dom';

// --> Project Imports
import { HOME, EXPLORE_PROJECTS, EXPLORE_TECH, REQUEST_QUOTE, NEED_WEBSITE } from 'routes';
import { Button, Modal } from 'components';
// import { PHONE, LEAF } from 'icons';

// --> Components Imports
import Drawer from './drawer/Drawer';
import Link from './link/Link.jsx';
import Style from './mobileNav.module.scss';
import Toggle from './toggle/Toggle.jsx';

export default function MobileNav({ services = [] }) {
	const [open, toggleOpen] = React.useState(false);

	const ToggleLink = ({ to, children }) => (
		<Link toggle={toggleOpen} to={to}>
			{children}
		</Link>
	);
	const [contactOpen, toggleContactOpen] = React.useState(false);

	return (
		<>
			<div
				className={Style.ContactWrapper}
				// data-contact-open={contactOpen ? 1 : 0}
				data-toggle-open={open ? 1 : 0}>
				<Button space='10x' onClick={() => toggleContactOpen(true)} color='primary' thin>
					Get Started
				</Button>
				<Modal isOpen={contactOpen} title='Help Center' callback={toggleContactOpen}>
					<Button.FluidWrapper>
						<Button
							as={Link}
							to={REQUEST_QUOTE}
							// icon={LEAF}
							onClick={() => toggleContactOpen(false)}
							fluid
							space='10y'>
							Project Survey
						</Button>
						{/* <Button
							as={'a'}
							href={`tel:${PHONE_NUMBER}`}
							onClick={() => toggleContactOpen(false)}
							space='10y'
							fluid
							icon={PHONE}>
							Call Us Now
						</Button> */}
					</Button.FluidWrapper>
				</Modal>
			</div>
			<div className={Style.Container}>
				<Toggle toggle={() => toggleOpen(!open)} open={open} />
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
