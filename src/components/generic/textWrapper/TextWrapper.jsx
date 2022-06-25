// --> React
import React from 'react';

// --> Component Imports
import Style from './textWrapper.module.scss';

export default function TextWrapper({ light = null, children }) {
	return (
		<div className={Style.Wrapper} data-light={light ? 1 : 0}>
			{children}
		</div>
	);
}
