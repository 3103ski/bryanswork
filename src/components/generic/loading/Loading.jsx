// --> React
import React from 'react';

// --> Packages
import { Loader } from 'semantic-ui-react';

// --> Component Import
import Style from './loading.module.scss';

export function Loading({ size = 'small' }) {
	return (
		<div className={Style.Wrapper} data-size={size}>
			<div>
				<Loader active className={Style.Loader} />
			</div>
		</div>
	);
}
