// --> React
import React from 'react';

// --> Project Imports
import { Loading } from 'components';

// --> Component Imports
import Style from './tabs.module.scss';

export function Tabs({ panels = [], tabs = [] }) {
	// Container State
	const [containerWidth, setContainerWidth] = React.useState(null);
	const [reversedPanels, setReversedPanels] = React.useState(null);
	const [activePanel, setActivePanel] = React.useState(0);

	// Marker State
	const [markerWidth, setMarkerWidth] = React.useState(null);
	const [markerLeft, setMarkerLeft] = React.useState(0);

	// Refs
	const panelsOuterRef = React.createRef();
	const panelsInnerRef = React.createRef();
	const tabsInnerRef = React.createRef();

	// --> A helper to return calculated margin in a readable way
	const calcMargin = React.useCallback((index, length, width) => {
		return (length - (index + 1)) * width;
	}, []);

	// --> PANELS
	const [innerPanelMarginLeft, setInnerPanelMarginLeft] = React.useState(null);

	// Panel Component -> will get its default width from whatever the parent is.
	function Panel({ children }) {
		return (
			<div className={Style.Panel} style={{ width: `${containerWidth}px` }}>
				{children}
			</div>
		);
	}

	// --> TABS
	function Tab({ tab, ...rest }) {
		return (
			<div className={Style.Tab} {...rest}>
				<p>{tab}</p>
			</div>
		);
	}

	// Tab Click -> must push the marker to the location of that tab and set active panel
	const handleTabClick = React.useCallback(
		(tabIndex) => {
			// handle tab underline position & width
			let tab = tabsInnerRef.current.children[tabIndex].getBoundingClientRect();
			let containerOffset = tabsInnerRef.current.getBoundingClientRect().left;
			setMarkerLeft(tab.left - containerOffset);
			setMarkerWidth(tab.width);

			// set panel position
			let margin = calcMargin(tabIndex, panels.length, containerWidth);
			setInnerPanelMarginLeft(margin);

			// set active panel (used by resize listener)
			setActivePanel(tabIndex);
		},
		[calcMargin, containerWidth, panels.length, tabsInnerRef]
	);

	// Grab initial details about tabs on load
	React.useEffect(() => {
		if (
			panelsOuterRef.current &&
			tabsInnerRef.current &&
			!markerWidth &&
			!containerWidth &&
			!innerPanelMarginLeft &&
			!reversedPanels
		) {
			// Set the initial width the panels should have
			const outer = panelsOuterRef.current.getBoundingClientRect();
			setContainerWidth(outer.width);

			// Set initial tab underline width
			setMarkerWidth(tabsInnerRef.current.children[0].getBoundingClientRect().width);

			// Calculate and set the initial margin to position panels correctly
			let margin = calcMargin(0, panels.length, outer.width);
			setInnerPanelMarginLeft(margin);

			let newPanelOrder = panels.reverse();
			setReversedPanels(newPanelOrder);
		}
	}, [
		markerWidth,
		panelsOuterRef,
		panels,
		tabsInnerRef,
		containerWidth,
		innerPanelMarginLeft,
		reversedPanels,
		calcMargin,
	]);

	// The panels and slider must resize on screen resize
	const handleScreenResize = () => {
		const newWidth = panelsOuterRef.current.getBoundingClientRect().width;
		setContainerWidth(newWidth);
		return handleTabClick(activePanel);
	};

	React.useEffect(() => {
		window.addEventListener('resize', handleScreenResize);
		return () => window.removeEventListener('resize', handleScreenResize);
	});

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
				{!containerWidth || !reversedPanels ? (
					<Loading size='small' />
				) : (
					<div
						className={Style.PanelsInner}
						ref={panelsInnerRef}
						style={{
							width: `${containerWidth * panels.length}px`,
							marginLeft: `-${innerPanelMarginLeft}px`,
						}}>
						{reversedPanels.map((p, i) => (
							<Panel key={`${i}__${Math.random()}`}>{p}</Panel>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
