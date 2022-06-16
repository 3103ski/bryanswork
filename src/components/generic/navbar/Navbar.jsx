// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Project Imports
import { HOME, ABOUT } from 'routes';

// --> Component Imports
import Style from './navbar.module.scss';

export function Navbar() {
	return (
		<nav className={Style.Outer}>
			<Link className={Style.Link} to={HOME}>
				Home
			</Link>
			<Link className={Style.Link} to={ABOUT}>
				About
			</Link>
		</nav>
	);
}
