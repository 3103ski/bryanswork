// --> React
import React from 'react';

// --> Component Imports
import Style from './divider.module.scss';

export function Divider({ ...rest }) {
	return <div className={Style.Divider} {...rest} />;
}
