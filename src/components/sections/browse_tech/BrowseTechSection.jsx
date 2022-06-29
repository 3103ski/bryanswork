// --> React
import React from 'react';

// --> Packages
import { Grid, Ref } from 'semantic-ui-react';

// --> Project Imports
import { Section, Filters, TechCard, Loading, Header } from 'components';
import { fetchTechnologies } from 'groq';
import { checkSeshStorageAddIfNeeded } from 'util';
import { ARROW_RIGHT } from 'icons';
import { useFilterManager } from 'hooks';
import { EXPLORE_PROJECTS } from 'routes';

// --> Component Imports
import Style from './browseTechSection.module.scss';

export default function BrowseTechSection() {
	const { renderItems, filterOptions, activeFilters, totalMatches, totalItems, handleFilterClick, clearFilters } =
		useFilterManager({
			rootKey: 'tags',
			subKey: 'title',
			queryFunctionSetter: (callback) =>
				checkSeshStorageAddIfNeeded(`bw_browse_technologies`, callback, fetchTechnologies, null, 'tech'),
		});

	const stickyRef = React.createRef();

	return !renderItems ? (
		<Loading size='screen' />
	) : (
		<div className={Style.Wrapper}>
			<Header
				title={'Explore My Tech Experience'}
				backgroundColor={Style.color_primaryPale}
				buttons={[
					{
						link: EXPLORE_PROJECTS,
						icon: ARROW_RIGHT,
						text: 'Check Out Some Work',
					},
				]}>
				<p>
					I focus primarily on creating websites and web apps using{' '}
					<strong>React JS, Node, Express, and MongoDB.</strong> I have a passion for developement and love
					exploring other tools and tech when I have free time.
				</p>
			</Header>
			<Ref innerRef={stickyRef}>
				<Section fluid className={Style.Inner}>
					<Filters
						title='Filter Tech By Categories'
						itemsLabel='technologies'
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
