// --> React
import React from 'react';

// --> Packages
import { Sticky, Grid } from 'semantic-ui-react';

// --> Project Imports
import { intFromPx } from 'util';
import { Section } from 'components';

// --> Component Imports
import Style from './filters.module.scss';

/**
 * NOTE :: These components should be used with the useFilterManager hook.
 * These and the hook should be implimented in the component where
 * the data lives and will be browsed.
 */

export function Filters({
	title = 'Filters',
	filterOptions,
	filterClick,
	itemsLabel = '',
	totalMatches,
	totalItems,
	clearFilters,
	activeFilters,
	stickyContext = null,
}) {
	const filters = (
		<div className={Style.FilterSection} id='filterContainer'>
			<Section>
				<div className={Style.Top}>
					<p className={Style.Label}>{title}</p>
				</div>
				<div className={Style.FilterWrapper}>
					{filterOptions.map((filter, i) => (
						<Filter
							key={`${filter}__${i}`}
							activeFilters={activeFilters}
							label={filter}
							onClick={filterClick}
						/>
					))}
				</div>
				<p className={Style.ShowingText}>
					Showing {totalMatches} of {totalItems} {itemsLabel}{' '}
					{totalMatches < totalItems ? (
						<span className={Style.ClearBtn} onClick={clearFilters}>
							clear filters
						</span>
					) : null}
				</p>
			</Section>
		</div>
	);

	return !stickyContext ? (
		filters
	) : (
		<Sticky context={stickyContext} offset={intFromPx(Style.sizes_nav_height)}>
			{filters}
		</Sticky>
	);
}

/**
 *
 * @param {string} label - The label that will appear above the filter options
 * @param {function} onClick - This onClick should be provided by the filterManager hook.
 * @returns a functional filter option
 */

function Filter({ label = 'Add Label', onClick, activeFilters = [] }) {
	function handleFilterClick() {
		const top = document.getElementById('result_items');
		const wrapper = document.getElementById('result_wrapper');
		const offset =
			document.getElementById('filterContainer').getBoundingClientRect().height +
			intFromPx(Style.sizes_nav_height);

		if (top && wrapper) {
			wrapper.style.minHeight = `${window.innerHeight - offset}px`;
			window.scrollTo({
				behavior: 'smooth',
				top: top.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset - 20,
			});
		}

		return onClick(label);
	}

	return (
		<div className={Style.Filter} data-active={activeFilters.includes(label) ? 1 : 0} onClick={handleFilterClick}>
			<p>{label}</p>
		</div>
	);
}

Filters.Results = ({ renderItems, mapFunc, isCol = null }) => {
	let items = renderItems.length > 0 ? renderItems.map((item, index) => mapFunc(item, index)) : <Filters.NoMatches />;

	return (
		<div id='result_wrapper'>
			<Section id='result_items'>
				{isCol ? (
					<Grid centered>
						<Grid.Row>{items}</Grid.Row>
					</Grid>
				) : (
					items
				)}
			</Section>
		</div>
	);
};

Filters.NoMatches = () => (
	<div className={Style.NoMatchesWrapper}>
		<p>No Matches</p>
	</div>
);
