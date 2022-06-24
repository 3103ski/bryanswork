// --> React
import React from 'react';

// --> Packages
import { Grid, Image, Modal } from 'semantic-ui-react';
import BlockContent from '@sanity/block-content-to-react';

// --> Project Imports
import { Tabs, Section, TechTile } from 'components';
import { intFromPx } from 'util';

// --> Component Imports
import Style from './projectTabsSection.module.scss';

export default function ProjectTabsSection({ project }) {
	console.log(project);

	const [tabList, setTabList] = React.useState(null);
	const [panels, setPanels] = React.useState(null);

	const Description = () => (
		<div className={Style.Description}>
			{project.description ? <BlockContent blocks={project.description} /> : <p>Description coming soon</p>}
		</div>
	);

	const Tech = () => (
		<div>
			<Grid centered>
				<Grid.Row>
					{project.tech.map((t, i) => (
						<Grid.Column mobile={8} tablet={4} computer={3} key={`${t.title}__${i}`}>
							<TechTile tech={t} />
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</div>
	);

	const Mockups = () => {
		const [images, setImages] = React.useState(null);
		const [focusImage, setFocusImage] = React.useState(null);

		const handleThumbnailClick = (i) => {
			return setFocusImage(images[i]);
		};

		React.useEffect(() => {
			if (project.mockups && project.mockups.length > 0 && !images) {
				let imageList = project.mockups.map((image) => image.asset.url);
				setImages(imageList);
			}
		}, [images]);

		return (
			<div>
				<Modal inverted blur open={focusImage} onClose={() => setFocusImage(null)}>
					<Modal.Content style={{ marginTop: `${intFromPx(Style.sizes_nav_height) + 40}px !important` }}>
						<Image fluid rounded src={focusImage} />
					</Modal.Content>
				</Modal>
				<Grid centered>
					<Grid.Row>
						{!images
							? null
							: images.map((image, i) => (
									<Grid.Column computer={3} tablet={7} mobile={4}>
										<Image
											className={Style.MockupThumbnail}
											rounded
											fluid
											src={image}
											onClick={() => handleThumbnailClick(i)}
										/>
									</Grid.Column>
							  ))}
					</Grid.Row>
				</Grid>
			</div>
		);
	};

	React.useEffect(() => {
		let newTabList = [];
		let newPanels = [];

		if (!tabList && !panels) {
			if (project.description) {
				newTabList.push('Description');
				newPanels.push(<Description />);
			}
			if (project.tech && project.tech.length > 0) {
				newTabList.push('Tech');
				newPanels.push(<Tech />);
			}
			if (project.mockups && project.mockups.length > 0) {
				newTabList.push('Design Mockups');
				newPanels.push(<Mockups />);
			}

			setTabList(newTabList);
			setPanels(newPanels);
		}
	}, [panels, project, tabList]);

	return !project || !tabList || !panels ? null : (
		<Section className={Style.Container}>
			<Tabs tabs={tabList} panels={panels} />
		</Section>
	);
}
