// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Grid } from 'semantic-ui-react';

// --> Project Imports
import { TechLogo, Button } from 'components';
import { ARROW_RIGHT } from 'icons';
import { PROJECT_PAGE } from 'routes';

// --> Component Imports
import Style from './projectCard.module.scss';

export function ProjectCard({ project, activeFilters = [] }) {
	const calcFilterMacthes = (filters) => {
		let tech = project.tech.map((p) => p.title);
		let matchedTech = [];
		for (let x = 0; x < tech.length; x++) {
			if (filters.includes(tech[x])) matchedTech.push(tech[x]);
		}
		return matchedTech.join(', ');
	};

	return (
		project && (
			<div className={Style.Wrapper}>
				<Grid>
					<Grid.Row>
						<Grid.Column className={Style.Content} mobile={16} tablet={11} computer={13}>
							<h1>{project.title}</h1>
							<div className={Style.TechWrapper}>
								{project.tech.map((tech, i) => (
									<TechLogo
										logo={tech.icon}
										key={`${tech}_${i}`}
										width='24px'
										style={{ marginRight: '10px' }}
									/>
								))}
							</div>
							<p>Year Built: {project.year}</p>
							<p>{project.summary}</p>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={5} computer={3}>
							<Button as='a' href={project.projectLink} target='_blank' color='primary' thin space='10y'>
								Visit Project
							</Button>
							<Link to={`${PROJECT_PAGE}/${project.slug.current}`}>
								<Button color='none' thin space='10y' icon={ARROW_RIGHT} iconLeft={false}>
									Read More  
								</Button>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{activeFilters.length > 0 ? (
					<p className={Style.FilterMatches}>Matches: {calcFilterMacthes(activeFilters)}</p>
				) : null}
			</div>
		)
	);
}
