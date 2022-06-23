import sanityClient from 'sanityClient';

// •••••••••••••••••••••••••••••••••••••••••••••
// -> GROQ --> Graph-Relational-Object-Queries
// ---------------------------------------
//  A query language developed by Sanity for getting
//  data from Sanity healdless CMS projects.
// ---------------------------------------
// MORE INFO --> https://www.sanity.io/docs/how-queries-work
// •••••••••••••••••••••••••••••••••••••••••••••

//---------
// --> Tech
//---------
export function fetchTechnologies() {
	return sanityClient.fetch(
		`*[_type == 'techContent'][0]{
            title, 
            tech[]->{
                title, 
                icon,
                confidence,
                usage,
                description,
                link,
                tags[]->{
                    title
                }
            }
        }`
	);
}

//---------
// --> Projects
//---------

export function fetchProjects() {
	return sanityClient.fetch(
		`*[_type == 'workContent'][0]{
            title, 
            projects[]->{
                title,
                slug,
                projectLink,
                projectType,
                year,
                summary,
                category,
                status,
                mainImage{
                    asset-> {
                        url,
                        _id
                    }
                },
                tech[]-> {
                    icon,
                    title
                }
            }
        }`
	);
}

// export function fetchAboutPageInfo() {
// 	return sanityClient.fetch(
// 		`*[_type == 'about'][0]{
//             headerText,
//             headerVideo,
//             bioHeader,
//             bio
//         }`
// 	);
// }

// // Get Specific Service Content
// export function fetchServiceTemplateContent(slug) {
// 	return sanityClient.fetch(
// 		`*[slug.current == $slug][0]{
//             title,
//             body,
//             subtitle,
//             graphic->{
//                 img{
//                     asset->{
//                         url,
//                         _id
//                     }
//                 }
//             },
//             faqs[]-> {
//                 question,
//                 answer
//             },
//             mainImage{
//                 asset->{
//                     url,
//                     _id
//                 }
//             }
//         }`,
// 		{ slug }
// 	);
// }

//---------
// --> PORTFOLIO ITEMS
//---------
