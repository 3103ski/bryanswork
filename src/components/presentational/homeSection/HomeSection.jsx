// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { Section, Button } from 'components';
import { ARROW_RIGHT } from 'icons';

// --> Component Imports
import Style from './homeSection.module.scss';

export function HomePageSection({ title, text, button1, button2, bottomBorder = null, children }) {
	return (
		<div className={Style.Wrapper} data-bottom-border={bottomBorder ? 1 : 0}>
			<Section>
				<Grid>
					<Grid.Row>
						<Grid.Column className={Style.SectionContent} mobile={16} computer={10}>
							<h1>{title}</h1>
							{children}
							<p>{text}</p>
							<Link to={button1.route}>
								<Button space='10y'>{button1.text}</Button>
							</Link>
							{button2 ? (
								<Link to={button2.route}>
									<Button color={'none'} icon={ARROW_RIGHT} iconLeft={false}>
										{button2.text}
									</Button>
								</Link>
							) : null}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Section>
		</div>
	);
}
