// --> React
import React from 'react';

// --> Packages
import { Icon } from '@iconify/react';
import { Button as SUIButton } from 'semantic-ui-react';

// --> Component Imports
import style from './button.module.scss';

export function Button({
	color = 'primary',
	txtcolor = 'light',
	icon = null,
	thin = null,
	onlyIcon = null,
	space = '',
	selfCenter = null,
	children,
	className,
	...rest
}) {
	return (
		<SUIButton
			data-space={space}
			data-color={color}
			data-only-icon={onlyIcon ? 1 : 0}
			data-txt-color={txtcolor}
			data-thin={thin ? '1' : '0'}
			data-self-center={selfCenter ? 1 : 0}
			className={`${style.Button} ${className}`}
			{...rest}>
			{icon ? <Icon icon={icon} /> : null}
			{children}
		</SUIButton>
	);
}

Button.FluidWrapper = ({ children }) => <div style={{ width: '100%' }}>{children}</div>;
