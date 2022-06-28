// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Ref } from 'semantic-ui-react';

// --> Project Imports
import { Filters, Section, ProjectCard, Loading, TextWrapper, Button } from 'components';
import { checkSeshStorageAddIfNeeded } from 'util';
import { fetchProjects } from 'groq';
import { useFilterManager } from 'hooks';
import { CONTACT, REQUEST_QUOTE } from 'routes';
import { ARROW_RIGHT } from 'icons';

// --> Component Imports
import Style from './browseProjectsSection.module.scss';

export default function BrowseProjectsSection() {
	const stickyRef = React.createRef();

	const { renderItems, filterOptions, activeFilters, totalMatches, totalItems, handleFilterClick, clearFilters } =
		useFilterManager({
			rootKey: 'tech',
			subKey: 'title',
			queryFunctionSetter: (setter) =>
				checkSeshStorageAddIfNeeded(`bw__projects_browse`, setter, fetchProjects, null, 'projects'),
		});

	return !renderItems ? (
		<Loading size='screen' />
	) : (
		<div className={Style.Wrapper}>
			<Section fluid className={Style.BrowseHeader}>
				<Section>
					<h1>Explore My Work</h1>
					<TextWrapper light>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius libero dicta esse nihil non
							dolor in aspernatur, aperiam ipsam consectetur adipisci exercitationem et fugiat voluptas
							distinctio optio provident nesciunt velit.
						</p>
						<Link to={REQUEST_QUOTE}>
							<Button icon={ARROW_RIGHT} color={'none'} thin>
								If you're ready to start a project, fill out my project survey
							</Button>
						</Link>
						<Link to={CONTACT}>
							<Button icon={ARROW_RIGHT} thin color={'none'}>
								If you have some questions for me first, reach out
							</Button>
						</Link>
					</TextWrapper>
				</Section>
			</Section>
			<Ref innerRef={stickyRef}>
				<Section fluid>
					<Filters
						title='Filter Projects By Tech'
						itemsLabel='projects'
						stickyContext={stickyRef}
						fromHook={{
							activeFilters,
							filterOptions,
							totalItems,
							totalMatches,
							clearFilters,
							handleFilterClick,
						}}
					/>
					<Filters.Results
						renderItems={renderItems}
						mapFunc={(p, i) => (
							<ProjectCard activeFilters={activeFilters} key={`${p.title}__${i}`} project={p} />
						)}
					/>
				</Section>
			</Ref>
		</div>
	);
}
