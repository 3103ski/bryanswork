// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { Section, Divider, Button } from 'components';
import { EXPLORE_PROJECTS, EXPLORE_TECH, REQUEST_QUOTE, NEED_WEBSITE, CONTACT } from 'routes';

// --> Component Imports
import Style from './footer.module.scss';

export function Footer() {
	return (
		<div className={Style.Outer}>
			<Section className={Style.Inner}>
				<Grid className={Style.Grid} textAlign='center'>
					<Grid.Row>
						<Grid.Column tablet={16} mobile={16} computer={9} textAlign='left'>
							<h3>Bryan Jastrzembski</h3>
							<p>Seattle, Wa</p>
							<Divider indent={false} spaceBottom={false} />
							<div className={Style.Links}>
								<Grid columns={3}>
									<Grid.Row>
										<Grid.Column>
											<Link to={EXPLORE_PROJECTS}>
												<p>Explore Work</p>
											</Link>
										</Grid.Column>
										<Grid.Column>
											<Link to={EXPLORE_TECH}>
												<p>Explore Tech Experience</p>
											</Link>
										</Grid.Column>
										<Grid.Column>
											<Link to={NEED_WEBSITE}>
												<p>Need A Website?</p>
											</Link>
										</Grid.Column>
										<Grid.Column>
											<Link to={CONTACT}>
												<p>Contact</p>
											</Link>
										</Grid.Column>
										<Grid.Column>
											<p>FAQs</p>
										</Grid.Column>
										<Grid.Column>
											<p>Privacy Policy</p>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</div>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} computer={3} className={Style.Right}>
							<Button as={Link} to={REQUEST_QUOTE} fluid thin>
								Request A Quote
							</Button>

							<div className={Style.Logos}></div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Section>
			<div className={Style.ThinBar} />
		</div>
	);
}
