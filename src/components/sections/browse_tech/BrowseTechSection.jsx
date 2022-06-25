// --> React
import React from 'react';
import { Link } from 'react-router-dom';

// --> Packages
import { Grid, Ref } from 'semantic-ui-react';

// --> Project Imports
import { Section, Filters, TechCard, Loading, TextWrapper, Button } from 'components';
import { fetchTechnologies } from 'groq';
import { checkSeshStorageAddIfNeeded } from 'util';
import { ARROW_RIGHT } from 'icons';
import { useFilterManager } from 'hooks';
import { EXPLORE_PROJECTS } from 'routes';

// --> Component Imports
import Style from './browseTechSection.module.scss';

export default function BrowseTechSection() {
	const stickyRef = React.createRef();
	const { renderItems, filterOptions, activeFilters, totalMatches, totalItems, handleFilterClick, clearFilters } =
		useFilterManager({
			rootKey: 'tags',
			subKey: 'title',
			queryFunctionSetter: (setter) =>
				checkSeshStorageAddIfNeeded(`bw_browse_technologies`, setter, fetchTechnologies, null, 'tech'),
		});

	return !renderItems ? (
		<Loading size='screen' />
	) : (
		<div className={Style.Wrapper}>
			<Section fluid className={Style.BrowseHeader}>
				<Section>
					<h1>Explore My Tech Experience</h1>
					<TextWrapper>
						<p>
							I focus primarily on creating websites and web apps using{' '}
							<strong>React JS, Node, Express, and MongoDB.</strong> I have a passion for developement and
							love exploring other tools and tech when I have free time.
						</p>
					</TextWrapper>
					<Link to={EXPLORE_PROJECTS}>
						<Button icon={ARROW_RIGHT} thin color={'none'}>
							Check out some work
						</Button>
					</Link>
				</Section>
			</Section>
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
