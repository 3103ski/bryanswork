// --> React
import React from 'react';

// --> Packages
import { Sticky, Grid } from 'semantic-ui-react';
import { Icon } from '@iconify/react';

// --> Project Imports
import { intFromPx } from 'util';
import { Section } from 'components';
import { FILTERS_NO_FILL, CLOSE_X } from 'icons';

// --> Component Imports
import Style from './filters.module.scss';

/**
 * NOTE :: These components should be used with the useFilterManager hook.
 * These and the hook should be implimented in the component where
 * the data lives and will be browsed.
 */

export function Filters({
	title = 'Filters',
	itemsLabel = '',
	stickyContext = null,
	fromHook: { activeFilters, filterOptions, totalItems, clearFilters, handleFilterClick, totalMatches },
}) {
	const [mobileFiltersVisible, toggleMobileFiltersVisible] = React.useState(false);
	const filters = (
		<>
			<div className={Style.FilterSection} id='filterContainer'>
				<Section>
					<div className={`${Style.Top}`}>
						<p className={`${Style.Label} `}>{title}</p>
					</div>
					<div className={Style.FilterWrapper}>
						{filterOptions.map((filter, i) => (
							<Filter
								key={`${filter}__${i}`}
								activeFilters={activeFilters}
								label={filter}
								onClick={handleFilterClick}
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
			<div
				className={Style.Mobile_FilterSection}
				data-filters-visible={mobileFiltersVisible ? 1 : 0}
				id='filterContainer'>
				<div className={Style.CloseBackdrop} onClick={() => toggleMobileFiltersVisible(false)} />
				<div className={Style.Mobile_FilterWrapper}>
					<div className={Style.CloseWrapper} onClick={() => toggleMobileFiltersVisible(false)}>
						<Icon icon={CLOSE_X} />
					</div>
					<div className={`${Style.Top}`}>
						<p className={`${Style.Label} `}>{title}</p>
					</div>
					<div className={Style.Inner}>
						{filterOptions.map((filter, i) => (
							<Filter
								key={`${filter}__${i}`}
								activeFilters={activeFilters}
								label={filter}
								callback={() => toggleMobileFiltersVisible(false)}
								onClick={handleFilterClick}
							/>
						))}
					</div>
				</div>

				<div className={Style.DisplayPanel}>
					<p className={Style.ShowingText}>
						Showing {totalMatches} of {totalItems} {itemsLabel}{' '}
						{totalMatches < totalItems ? (
							<span className={Style.ClearBtn} onClick={clearFilters}>
								clear filters
							</span>
						) : null}
					</p>
					<div
						className={Style.IconWrapper}
						onClick={() => toggleMobileFiltersVisible(!mobileFiltersVisible)}>
						<Icon icon={FILTERS_NO_FILL} />
					</div>
				</div>
			</div>
		</>
	);

	const [offset, setOffset] = React.useState(null);

	const calcOffset = React.useCallback(() => {
		let width = window.innerWidth;
		let cpuBreakpoint = intFromPx(Style.bp_limit_cpu_sm_bottom);
		let cpuNavHeight = intFromPx(Style.sizes_nav_height);
		let offset = width < cpuBreakpoint ? 0 : cpuNavHeight;
		setOffset(offset);
	}, []);

	React.useEffect(() => {
		if (!offset) calcOffset();
	}, [calcOffset, offset]);

	React.useEffect(() => {
		window.addEventListener('resize', calcOffset);
		return () => window.removeEventListener('resize', calcOffset);
	});

	return !stickyContext ? (
		filters
	) : (
		<Sticky context={stickyContext} offset={offset}>
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

function Filter({ label = 'Add Label', onClick, callback, activeFilters = [] }) {
	function handlehandleFilterClick() {
		const top = document.getElementById('result_items');
		const wrapper = document.getElementById('result_wrapper');

		const offset =
			document.getElementById('filterContainer').getBoundingClientRect().height +
			intFromPx(Style.sizes_nav_height);

		if (top && wrapper) {
			wrapper.style.minHeight = `${window.innerHeight - offset}px`;
			window.scrollTo({
				behavior: 'smooth',
				top: top.getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset + 20,
			});
		}
		if (callback) callback();
		return onClick(label);
	}

	return (
		<div
			className={Style.Filter}
			data-active={activeFilters.includes(label) ? 1 : 0}
			onClick={handlehandleFilterClick}>
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
