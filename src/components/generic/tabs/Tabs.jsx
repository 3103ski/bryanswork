import React from 'react';

import Style from './tabs.module.scss';

export function Tabs({ panels = [], tabs = [] }) {
	// Container State
	const [active, setActive] = React.useState(0);
	const [containerWidth, setContainerWidth] = React.useState(null);

	// Marker State
	const [markerWidth, setMakerWidth] = React.useState(null);
	const [markerLeft, setMarkerLeft] = React.useState(0);

	// Refs
	const panelsOuterRef = React.createRef();
	const panelsInnerRef = React.createRef();
	const tabsInnerRef = React.createRef();

	// --> PANELS
	// Panel Component -> will get its default width from whatever the parent is.
	function Panel({ children }) {
		return (
			<div className={Style.Panel} style={{ width: `${containerWidth}px` }}>
				{children}
			</div>
		);
	}

	// const [activePanelHeight, setActivePanelHeight] = React.useState(null);
	const [innerPanelMarginLeft, setInnerPanelMarginLeft] = React.useState(null);

	// --> TABS
	function Tab({ tab, ...rest }) {
		return (
			<div className={Style.Tab} {...rest}>
				<p>{tab}</p>
			</div>
		);
	}

	// Tab Click -> must push the marker to the location of that tab and set active panel
	const calcMargin = React.useCallback((index, length, width) => {
		return (length - (index + 1)) * width;
	}, []);

	const handleTabClick = React.useCallback(
		(tabIndex) => {
			// tab related rects
			let tab = tabsInnerRef.current.children[tabIndex].getBoundingClientRect();
			let containerOffset = tabsInnerRef.current.getBoundingClientRect().left;
			setMarkerLeft(tab.left - containerOffset);
			setMakerWidth(tab.width);

			// sen initial slider position
			let margin = calcMargin(tabIndex, panels.length, containerWidth);
			setInnerPanelMarginLeft(margin);
			return setActive(tabIndex);
		},
		[calcMargin, containerWidth, panels.length, tabsInnerRef]
	);

	// The panels must get their width from the container ref after load
	// Marker should grab the width of whatever tab is first on load
	React.useEffect(() => {
		if (panelsOuterRef.current && tabsInnerRef.current && !markerWidth && !containerWidth) {
			const outer = panelsOuterRef.current.getBoundingClientRect();
			setContainerWidth(outer.width);
			setMakerWidth(tabsInnerRef.current.children[0].getBoundingClientRect().width);
			let margin = calcMargin(0, panels.length, outer.width);
			console.log(margin);
			setInnerPanelMarginLeft(margin);
		}
	}, [active, markerWidth, panelsOuterRef, panels, tabsInnerRef, containerWidth, calcMargin]);

	// Do not render the tabs if it cant render correctly
	if (tabs.length !== panels.length)
		return <p>You must provide the same amount of tabs and panels to Tab component</p>;

	// Return tabs when all is good
	return (
		<div
			className={Style.Container}
			style={{
				'--markerWidth': `${markerWidth}px`,
				'--markerLeft': `${markerLeft}px`,
			}}>
			<div className={Style.Tabs}>
				<div className={Style.TabsInner} ref={tabsInnerRef}>
					{tabs.map((t, i) => (
						<Tab key={`${i}__${t}`} onClick={() => handleTabClick(i)} tab={t} />
					))}
				</div>
				<div className={Style.ActiveMarker} />
			</div>
			<div className={Style.PanelsOuter} ref={panelsOuterRef}>
				{!containerWidth ? null : (
					<div
						className={Style.PanelsInner}
						ref={panelsInnerRef}
						style={{
							width: `${containerWidth * panels.length}px`,
							marginLeft: `-${innerPanelMarginLeft}px`,
						}}>
						{panels.map((p, i) => (
							<Panel key={`${i}__${Math.random()}`}>{p}</Panel>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
