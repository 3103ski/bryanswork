// --> React
import React from 'react';

// --> Packages
import { Icon } from '@iconify/react';
import { Button as SUIButton } from 'semantic-ui-react';

// --> Component Imports
import style from './button.module.scss';

export function Button({
	color = 'primary',
	txtcolor = '',
	icon = null,
	thin = null,
	onlyIcon = null,
	iconLeft = true,
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
			data-icon-left={iconLeft ? 1 : 0}
			data-thin={thin ? '1' : '0'}
			data-no-text={children === undefined ? 1 : 0}
			data-self-center={selfCenter ? 1 : 0}
			className={`${style.Button} ${className}`}
			{...rest}>
			{icon && iconLeft ? <Icon icon={icon} /> : null}
			{children}
			{icon && !iconLeft ? <Icon icon={icon} /> : null}
		</SUIButton>
	);
}

Button.FluidWrapper = ({ children }) => <div style={{ width: '100%' }}>{children}</div>;
