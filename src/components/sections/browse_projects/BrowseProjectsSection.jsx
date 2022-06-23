// --> React
import React from 'react';

// --> Packages
import { Ref, Sticky } from 'semantic-ui-react';

// --> Project Imports
import { Filter, Section, ProjectCard, Loading } from 'components';
import { checkSeshStorageAddIfNeeded, intFromPx } from 'util';
import { fetchProjects } from 'groq';
import { useFilterManager } from 'hooks';

// --> Component Imports
import Style from './browseProjectsSection.module.scss';

export default function BrowseProjectsSection() {
	//•••••••••••••••••••••
	// --> Project Data
	//•••••••••••••••••••••
	const [projects, setProjects] = React.useState(null);

	// --> Sanity CMS
	React.useEffect(() => {
		checkSeshStorageAddIfNeeded(`bw__projects_browse`, setProjects, fetchProjects, null, 'projects');
	}, []);

	//•••••••••••••••••••••
	// --> Project Filters
	//•••••••••••••••••••••
	const { setList, handleFilterClick, clearFilters, filterOptions, activeFilters, renderItems, toggleStrictFilters } =
		useFilterManager({
			rootKey: 'tech',
			subKey: 'title',
		});
	const filterRef = React.createRef();

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
			<Ref innerRef={filterRef}>
				<Section fluid>
					<Sticky context={filterRef} offset={intFromPx(Style.sizes_nav_height)}>
						<Filter.Wrapper
							label='Filter Projects By Tech'
							activeFilters={activeFilters}
							visible={renderItems.length}
							clearFilters={clearFilters}
							showingLabel='projects'
							total={projects.length}
							toggleStrict={toggleStrictFilters}>
							{filterOptions &&
								filterOptions.map((filter, i) => (
									<Filter
										key={`${filter}__${i}`}
										onClick={handleFilterClick}
										container={'result_items'}
										activeFilters={activeFilters}
										label={filter}
									/>
								))}
						</Filter.Wrapper>
					</Sticky>
					<div id='result_wrapper'>
						<Section id='result_items'>
							{renderItems.length > 0 ? (
								renderItems.map((p, i) => (
									<ProjectCard activeFilters={activeFilters} key={`${p.title}__${i}`} project={p} />
								))
							) : (
								<Filter.NoMatches />
							)}
						</Section>
					</div>
				</Section>
			</Ref>
		</div>
	);
}
