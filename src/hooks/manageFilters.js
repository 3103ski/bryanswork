// --> React

import React from 'react';

export default function useFilterManager({ rootKey, subKey = null, queryFunctionSetter }) {
	const [list, setList] = React.useState(null);

	const [strictFilters, toggleStrictFilters] = React.useState(false);
	const [filterOptions, setFilterOptions] = React.useState(null);
	const [activeFilters, setActiveFilters] = React.useState([]);
	const [renderItems, setRenderItems] = React.useState(null);

	const getFilterOptions = (items) => {
		let options = [];
		for (let x = 0; x < items.length; x++) {
			let updatedTings;
			if (subKey) {
				updatedTings = items[x][rootKey] ? items[x][rootKey].map((p) => p[subKey]) : [];
			} else {
				updatedTings = items.map((item) => item[rootKey]);
			}
			options = [...options, ...updatedTings];
		}
		options = [...new Set(options)].sort();
		setFilterOptions(options);
	};

	const handleRenderItems = React.useCallback(
		(filters) => {
			if (list) {
				let setThese = list
					.map((p, i) =>
						(filters.length > 0 &&
							strictFilters === false &&
							p[rootKey].map((t) => t[subKey]).filter((t) => filters.includes(t)).length > 0) ||
						(filters.length > 0 &&
							strictFilters === true &&
							p[rootKey].map((t) => t[subKey]).filter((t) => filters.includes(t)).length ===
								filters.length) ||
						filters.length === 0
							? p
							: null
					)
					.filter((p) => p !== null);

				setRenderItems([...setThese]);
			}
		},
		[list, rootKey, strictFilters, subKey]
	);

	const handleFilterClick = React.useCallback(
		(filter) => {
			let updatedFilters = [];
			if (activeFilters.includes(filter)) {
				updatedFilters = activeFilters.filter((f) => f !== filter);
			} else {
				updatedFilters = [...activeFilters, filter];
			}
			setActiveFilters([...updatedFilters]);
			handleRenderItems(updatedFilters);
		},
		[activeFilters, handleRenderItems]
	);

	const handleStrictToggle = React.useCallback(
		(checked) => {
			console.log({ activeFilters });
			toggleStrictFilters(checked);
			handleRenderItems(activeFilters);
		},
		[activeFilters, handleRenderItems]
	);

	const clearFilters = React.useCallback(() => {
		let updatedFilters = [];

		setActiveFilters([...updatedFilters]);
		handleRenderItems(updatedFilters);
	}, [handleRenderItems]);

	React.useEffect(() => {
		if (!filterOptions && list) {
			getFilterOptions(list);
			handleRenderItems(activeFilters);
		}
	});

	// Query Function Setter should a function that obtains data, accepts a callback, and passes the data results into that callback
	React.useEffect(() => {
		if (queryFunctionSetter && !list) {
			queryFunctionSetter(setList);
		}
	}, [list, queryFunctionSetter]);

	return {
		strictFilters,
		clearFilters,
		handleStrictToggle,
		filterOptions,
		setList,
		totalItems: list ? list.length : [],
		totalMatches: renderItems ? renderItems.length : 0,
		activeFilters,
		renderItems,
		handleFilterClick,
		getFilterOptions,
		handleRenderItems,
	};
}
