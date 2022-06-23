// --> React
import React from 'react';

// --> Component Imports
import Style from './divider.module.scss';

export function Divider({ indent = true, spaceBottom = true, ...rest }) {
	return (
		<div data-indent={indent ? 1 : 0} className={Style.Divider} data-space-bottom={spaceBottom ? 1 : 0} {...rest} />
	);
}
