// --> React
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// --> Packages
import { Icon } from '@iconify/react';

// --> Project Imports
import { BACK_ARROW } from 'icons';
import { HOME } from 'routes';

// --> Component Imports
import Style from './backBtn.module.scss';

export default function BackBtn({ menuOpen }) {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div
			className={Style.Wrapper}
			data-menu-open={menuOpen ? 1 : 0}
			data-is-home={location.pathname === HOME ? 1 : 0}
			onClick={() => navigate(-1)}>
			<Icon icon={BACK_ARROW} />
		</div>
	);
}
