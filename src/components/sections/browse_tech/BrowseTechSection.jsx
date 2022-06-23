// --> React
import React from 'react';

// --> Packages
import { Grid, Ref, Sticky } from 'semantic-ui-react';

// --> Project Imports
import { Section, Filter, TechCard, Loading } from 'components';
import { fetchTechnologies } from 'groq';
import { checkSeshStorageAddIfNeeded, intFromPx } from 'util';
import { useFilterManager } from 'hooks';

// --> Component Imports
import Style from './browseTechSection.module.scss';

export default function BrowseTechSection() {
	// •••••••••••••••••••••
	// --> Component Data
	// •••••••••••••••••••••
	const [tech, setTech] = React.useState(null);

	React.useEffect(() => {
		checkSeshStorageAddIfNeeded(`bw_browse_technologies`, setTech, fetchTechnologies, null, 'tech');
	}, []);

	// ••••••••••••••••••••••••••••
	// --> Component Data Filters
	// ••••••••••••••••••••••••••••
	const { setList, handleFilterClick, clearFilters, filterOptions, activeFilters, renderItems, toggleStrictFilters } =
		useFilterManager({
			rootKey: 'tags',
			subKey: 'title',
		});
	const filterColRef = React.createRef();

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
			<Ref innerRef={filterColRef}>
				<Section fluid className={Style.Inner}>
					<Sticky context={filterColRef} offset={intFromPx(Style.sizes_nav_height)}>
						<Filter.Wrapper
							label='Filter Tech By Categories'
							activeFilters={activeFilters}
							visible={renderItems.length}
							clearFilters={clearFilters}
							showingLabel='technologies'
							total={tech.length}
							toggleStrict={toggleStrictFilters}>
							{filterOptions &&
								filterOptions.map((filter, i) => (
									<Filter
										key={`${filter}__${i}`}
										container={'result_items'}
										onClick={handleFilterClick}
										activeFilters={activeFilters}
										label={filter}
									/>
								))}
						</Filter.Wrapper>
					</Sticky>
					<div id='result_wrapper'>
						<Section>
							<Grid centered>
								<Grid.Row id='result_items'>
									{renderItems.length > 0 ? (
										renderItems.map((t, i) => (
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
										))
									) : (
										<Filter.NoMatches />
									)}
								</Grid.Row>
							</Grid>
						</Section>
					</div>
				</Section>
			</Ref>
		</div>
	);
}
