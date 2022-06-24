// --> React
import React from 'react';

import { Grid, Image } from 'semantic-ui-react';

// --> Project Imports
import { Loading, Section, Detail, Button } from 'components';

// --> Component Imports
import Style from './projectHeader.module.scss';

export default function ProjectHeader({ project }) {
	return !project ? (
		<Loading />
	) : (
		<div className={Style.HeaderWrapper}>
			<Section>
				<div className={Style.TitleWrapper}>
					<h1>{project.title}</h1>
					<p>{project.projectType}</p>
				</div>
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={8} computer={9}>
							{project.mainImage ? <Image rounded bordered src={project.mainImage.asset.url} /> : null}
						</Grid.Column>
						<Grid.Column stretched mobile={16} tablet={8} computer={7} className={Style.DetailsColumn}>
							<div className={Style.DetailInner}>
								<Detail label='Category' text={project.category} />
								<Detail label='Year' text={project.year} />
								<Detail label='Status' text={project.status} />
								<Button
									as='a'
									thin
									className={Style.ProjectLink}
									target='_blank'
									href={project.projectLink}>
									Visit Project
								</Button>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Section>
		</div>
	);
}
