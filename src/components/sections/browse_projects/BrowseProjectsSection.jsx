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
	// --> Project Data
	//•••••••••••••••••••••
	const [projects, setProjects] = React.useState(null);

	React.useEffect(() => {
		checkSeshStorageAddIfNeeded(`bw__projects_browse`, setProjects, fetchProjects, null, 'projects');
	}, []);

	//•••••••••••••••••••••
	// --> Project Filters
	//•••••••••••••••••••••
	const { setList, handleFilterClick, clearFilters, filterOptions, activeFilters, renderItems } = useFilterManager({
		rootKey: 'tech',
		subKey: 'title',
	});

	const stickyRef = React.createRef();

	React.useEffect(() => {
		if (!filterOptions && projects) {
			setList(projects);
		}
	});

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
						totalItems={projects.length}
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
