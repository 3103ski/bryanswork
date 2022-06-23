// --> React
import React from 'react';

// --> Packages
import { Grid, Ref } from 'semantic-ui-react';

// --> Project Imports
import { Section, Filters, TechCard, Loading } from 'components';
import { fetchTechnologies } from 'groq';
import { checkSeshStorageAddIfNeeded } from 'util';
import { useFilterManager } from 'hooks';

// --> Component Imports
import Style from './browseTechSection.module.scss';

export default function BrowseTechSection() {
	// •••••••••••••••••••••
	// --> Tech Data
	// •••••••••••••••••••••
	const [tech, setTech] = React.useState(null);

	React.useEffect(() => {
		checkSeshStorageAddIfNeeded(`bw_browse_technologies`, setTech, fetchTechnologies, null, 'tech');
	}, []);

	// ••••••••••••••••••••••••••••
	// --> Tech Filters
	// ••••••••••••••••••••••••••••
	const { setList, handleFilterClick, clearFilters, filterOptions, activeFilters, renderItems } = useFilterManager({
		rootKey: 'tags',
		subKey: 'title',
	});
	const stickyRef = React.createRef();

	React.useEffect(() => {
		if (!filterOptions && tech) {
			setList(tech);
		}
	});

	return !renderItems ? (
		<Loading size='screen' />
	) : (
		<div className={Style.Wrapper}>
			<Section fluid className={Style.BrowseHeader}>
				<h1>A bunch of section stuff here</h1>
			</Section>
			<Ref innerRef={stickyRef}>
				<Section fluid className={Style.Inner}>
					<Filters
						title='Filter Tech By Categories'
						itemsLabel='technologies'
						stickyContext={stickyRef}
						totalMatches={renderItems.length}
						totalItems={tech.length}
						filterOptions={filterOptions}
						activeFilters={activeFilters}
						clearFilters={clearFilters}
						filterClick={handleFilterClick}
					/>
					<Filters.Results
						renderItems={renderItems}
						isCol
						mapFunc={(t, i) => (
							<Grid.Column key={`${i}__${t.icon}`} computer={5} tablet={8} mobile={16}>
								<TechCard
									tech={{
										tech: t.icon,
										title: t.title,
										confidence: t.confidence,
										usage: t.usage,
										description: t.description,
										link: t.link,
									}}
								/>
							</Grid.Column>
						)}
					/>
				</Section>
			</Ref>
		</div>
	);
}
