// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { Section, Divider, Button } from 'components';
import { ARROW_RIGHT } from 'icons';
import { EXPLORE_PROJECTS, REQUEST_QUOTE } from 'routes';

// --> Component Imports
import Style from './needDecSection.module.scss';

export default function NeedDevSection() {
	return (
		<div className={Style.Wrapper}>
			<Section>
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} computer={10}>
							<h1>Need A Developer?</h1>
							<Divider />
							<p>
								If you need a website or web app, you can get an estimate by filling out a quote form.
								Feel free to contact me with questions
							</p>
							<Link to={REQUEST_QUOTE}>
								<Button space='10y'>Request A Quote</Button>
							</Link>
							<Link to={EXPLORE_PROJECTS}>
								<Button icon={ARROW_RIGHT} color='none' iconLeft={false}>
									See Some Work
								</Button>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Section>
		</div>
	);
}
