// --> React
import React from 'react';

// --> Component Imports
import Style from './detail.module.scss';

export function Detail({ text = 'add the details', label = null, meta = null }) {
	return (
		<div className={Style.Wrapper} data-is-meta={meta ? 1 : 0}>
			{label ? <h5>{label}</h5> : null}
			<p>{text}</p>
		</div>
	);
}
