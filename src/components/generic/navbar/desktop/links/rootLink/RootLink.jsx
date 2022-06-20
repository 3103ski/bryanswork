// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Project Imports

// --> Component Imports
import Style from './rootLink.module.scss';

export default function RootLink({ to, hover = true, padding = true, children, ...rest }) {
	return to ? (
		<Link to={to} className={Style.Link} data-hover={hover ? 1 : 0} data-padding={padding ? 1 : 0} {...rest}>
			<p>{children}</p>
		</Link>
	) : (
		<a className={Style.Link} data-hover={hover ? 1 : 0} data-padding={padding ? 1 : 0} {...rest}>
			<p>{children}</p>
		</a>
	);
}
