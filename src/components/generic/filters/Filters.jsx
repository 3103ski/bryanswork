// --> React
import React from 'react';

// --> Project Imports
import { intFromPx } from 'util';
import { Section } from 'components';

// --> Component Imports
import Style from './filters.module.scss';

export function Filter({ label = 'Add Label', container, onClick, activeFilters = [] }) {
	function handleOnClick() {
		const top = document.getElementById(container);
		const offset =
			document.getElementById('filterContainer').getBoundingClientRect().height +
			intFromPx(Style.sizes_nav_height);
		const wrapper = document.getElementById('result_wrapper');
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
		<div className={Style.Filter} data-active={activeFilters.includes(label) ? 1 : 0} onClick={handleOnClick}>
			<p>{label}</p>
		</div>
	);
}

Filter.Wrapper = ({ label = 'Filters', showingLabel = '', visible, total, clearFilters, children }) => (
	<div className={Style.FilterSection} id='filterContainer'>
		<Section>
			<div className={Style.Top}>
				<p className={Style.Label}>{label}</p>
			</div>
			<div className={Style.FilterWrapper}>{children}</div>
			<p className={Style.ShowingText}>
				Showing {visible} of {total} {showingLabel}{' '}
				{visible < total ? (
					<span className={Style.ClearBtn} onClick={clearFilters}>
						clear filters
					</span>
				) : null}
			</p>
		</Section>
	</div>
);

Filter.NoMatches = () => (
	<div className={Style.NoMatchesWrapper}>
		<p>No Matches</p>
	</div>
);
