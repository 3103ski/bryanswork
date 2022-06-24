// --> React
import React from 'react';
import { useParams } from 'react-router-dom';

// --> Project Imports
import { Loading, ProjectTemplateHeader } from 'components';
import { checkSeshStorageAddIfNeeded } from 'util';
import { fetchProject } from 'groq';

// --> Component Imports
import ViewWrapper from './ViewWrapper';

export default function ProjectTemplatePage() {
	const [project, setProject] = React.useState(null);
	const { slug } = useParams();

	React.useEffect(() => {
		checkSeshStorageAddIfNeeded(`fmlc_${slug}__article`, setProject, () => fetchProject(slug));
	}, [slug]);
	console.log({ project });
	return !project ? (
		<Loading size='screen' />
	) : (
		<ViewWrapper>
			<ProjectTemplateHeader project={project} />
		</ViewWrapper>
	);
}
