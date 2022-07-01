// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Project Imports
import { Section, TextWrapper, Button } from 'components';

// --> Component Imports
import Style from './header.module.scss';
import './semantic-ui-override.scss';

// •• Used for simple, direct, page headears
export default function Header({ title, text, backgroundColor = '', buttons = [], light, children }) {
	function renderButtons() {
		let renderButtons = [];
		buttons.map((btn) => {
			let returnButton = (
				<Button
					thin={btn.large ? null : true}
					color={btn.color ? btn.color : 'none'}
					icon={btn.icon ? btn.icon : ''}>
					{btn.text}
				</Button>
			);
			if (btn.link) returnButton = <Link to={btn.link}>{returnButton}</Link>;
			return renderButtons.push(returnButton);
		});
		return renderButtons;
	}
	return (
		<Section fluid className={Style.Container} style={{ backgroundColor, marginLeft: '0 !important' }}>
			<Section>
				<TextWrapper light={light ? true : null}>
					<h1>{title}</h1>
					{children ? children : <p>{text}</p>}
					{renderButtons().map((b, i) => {
						return <div key={`${i}__${Math.random()}`}>{b}</div>;
					})}
				</TextWrapper>
			</Section>
		</Section>
	);
}
