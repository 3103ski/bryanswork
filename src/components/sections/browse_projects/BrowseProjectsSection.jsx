// --> React
import React from 'react';

// --> Packages
import { Ref } from 'semantic-ui-react';

// --> Project Imports
import { Filters, Section, ProjectCard, Loading, Header } from 'components';
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
			queryFunctionSetter: (callback) =>
				checkSeshStorageAddIfNeeded(`bw__projects_browse`, callback, fetchProjects, null, 'projects'),
			// qFS ===>  hit api ->  obtain results -> callback(results)
		});

	return !renderItems ? (
		<Loading size='screen' />
	) : (
		<div className={Style.Wrapper}>
			<Header
				light
				title={'Explore My Work'}
				backgroundColor={Style.color_secondary}
				buttons={[
					{
						link: REQUEST_QUOTE,
						icon: ARROW_RIGHT,
						text: `Need work?`,
					},
					{
						link: CONTACT,
						icon: ARROW_RIGHT,
						text: `Send a message`,
					},
				]}>
				<p>
					I focus primarily on creating websites and web apps using{' '}
					<strong>React JS, Node, Express, and MongoDB.</strong> I have a passion for developement and love
					exploring other tools and tech when I have free time.
				</p>
			</Header>
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
