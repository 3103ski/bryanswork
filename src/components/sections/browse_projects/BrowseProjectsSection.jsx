// --> React
import React from 'react';

// --> Packages
import { Ref } from 'semantic-ui-react';

// --> Project Imports
import { Filters, Section, ProjectCard, Loading } from 'components';
import { checkSeshStorageAddIfNeeded } from 'util';
import { fetchProjects } from 'groq';
import { useFilterManager } from 'hooks';

// --> Component Imports
import Style from './browseProjectsSection.module.scss';

export default function BrowseProjectsSection() {
	//•••••••••••••••••••••
	// --> Project Filters
	//•••••••••••••••••••••
	const { totalItems, handleFilterClick, clearFilters, filterOptions, activeFilters, renderItems } = useFilterManager(
		{
			rootKey: 'tech',
			subKey: 'title',
			queryFunctionSetter: (setter) =>
				checkSeshStorageAddIfNeeded(`bw__projects_browse`, setter, fetchProjects, null, 'projects'),
		}
	);

	const stickyRef = React.createRef();

	return renderItems === null ? (
		<Loading size='screen' />
	) : (
		<div className={Style.Wrapper}>
			<Section fluid className={Style.BrowseHeader}>
				<h1>A bunch of section stuff here</h1>
			</Section>
			<Ref innerRef={stickyRef}>
				<Section fluid>
					<Filters
						title='Filter Projects By Tech'
						itemsLabel='projects'
						stickyContext={stickyRef}
						totalMatches={renderItems.length}
						totalItems={totalItems}
						filterOptions={filterOptions}
						activeFilters={activeFilters}
						clearFilters={clearFilters}
						filterClick={handleFilterClick}
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
