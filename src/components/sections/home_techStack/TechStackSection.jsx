// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { Section, TechLogo, Button } from 'components';
import { ARROW_RIGHT } from 'icons';
import { EXPLORE_TECH } from 'routes';

// --> Component Imports
import Style from './techStackSection.module.scss';

export default function TechStackSection() {
	let priamryStack = ['mongodb', 'express', 'react', 'node', 'graphql'];
	return (
		<div className={Style.Wrapper}>
			<Section>
				<Grid>
					<Grid.Row>
						<Grid.Column className={Style.SectionContent} mobile={16} computer={10}>
							<h1>Primary Tech Stack</h1>
							<div className={Style.StackIcons}>
								{priamryStack.map((tech, i) => (
									<TechLogo
										width='30px'
										key={`${i}_${tech}__${i}`}
										style={{ margin: '0 5px 10px 5px' }}
										logo={tech}
									/>
								))}
							</div>
							<p>
								I focus primarily on creating websites and web apps using React JS, Node, Express, and
								MongoDB. I have a passion for developement and love exploring other tools and tech when
								I have free time.
							</p>
							<Link to={EXPLORE_TECH}>
								<Button space='10y'>Explore Other Things I've Used</Button>
							</Link>
							<Button color={'none'} icon={ARROW_RIGHT} iconLeft={false}>
								Read About My Practices
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Section>
		</div>
	);
}
