// ==> React
import React from 'react';

// --> Packages
import { Icon } from '@iconify/react';

// --> Project Imports
import { CIRCLE_CHECK } from 'icons';

// --> Component Imports
import Style from './shared.module.scss';

export function FormSuccess({ successText = 'Form Sent!', subtext = null, children }) {
	return (
		<div className={Style.SuccessWrapper}>
			<div className={Style.SuccessInner}>
				<div className={Style.Top}>
					<div className={Style.IconWrapper}>
						<Icon icon={CIRCLE_CHECK} />
					</div>
					<h1>{successText}</h1>
				</div>
				{subtext && <p>{subtext}</p>}
				{children}
			</div>
		</div>
	);
}
