// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Project Imports
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { Section, Divider, Button } from 'components';
import { profile_pic } from 'assets';
import { EXPLORE_PROJECTS, REQUEST_QUOTE } from 'routes';

// --> Component Imports
import VectorGraphic from './vectorGraphic/VectorGraphic.jsx';
import Style from './landingSection.module.scss'; // use for more specific section styles

export default function HomeLandingSection() {
	return (
		<div className={Style.Wrapper}>
			<div className={Style.Top}>
				<Section>
					<Grid>
						<Grid.Row>
							<Grid.Column computer={4} mobile={16} className={Style.ProfilePic}>
								<img src={profile_pic} alt='bryan pic' />
							</Grid.Column>
							<Grid.Column computer={12} mobile={16}>
								<div className={Style.Text}>
									<h1>BRYAN JASTRZEMBSKI</h1>
									<Divider />
									<p id='landingText'>
										A passion for web tech and a focus on using the <span>MERN</span> stack and{' '}
										<span>GraphQL</span> for dynamic & modern web experiences
									</p>
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Section>
				<VectorGraphic />
			</div>
			<div className={Style.Bottom}>
				<Grid>
					<Grid.Row>
						<Grid.Column computer={16} mobile={16}>
							<div className={Style.Buttons}>
								<Link to={EXPLORE_PROJECTS}>
									<Button space='10xy'>Explore My Work</Button>
								</Link>
								<Link to={REQUEST_QUOTE}>
									<Button space='10xy'>Request Website Quote</Button>
								</Link>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</div>
	);
}
