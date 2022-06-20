// --> React
import React from 'react';

// --> Project Imports
import { windowData } from 'util';

// --> --> Component Imports
import Style from './vectorGraphic.module.scss';

export default function VectorGraphic() {
	// const [height, setHeight] = React.useState(0);
	const [width, setWidth] = React.useState(0);

	function handleAdjustSize() {
		const { width } = windowData();
		// setHeight(height);
		setWidth(width);
	}

	React.useEffect(() => {
		handleAdjustSize();
		window.onresize = handleAdjustSize;
	}, []);

	return React.useMemo(
		() => (
			<div className={Style.Outer}>
				<svg width={`${width}px`} height='100px'>
					<path d={`m 0 0 l ${width} 80 l 0 20 l -${width} 0 `} fill={Style.color_primary} />
				</svg>
			</div>
		),
		[width]
	);
}
