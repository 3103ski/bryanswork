// --> React
import React from 'react';

import {
	js,
	react,
	webflow,
	html,
	netlify,
	sass,
	wordpress,
	apollo,
	aws,
	cloudinary,
	css,
	express,
	figma,
	gatsby,
	github,
	graphql,
	heroku,
	mongodb,
	node,
	npm,
	sanity,
	stripe,
	vscode,
} from './logos';

export function TechLogo({ width = '100%', logo = 'js', style = {}, ...rest }) {
	let src = js;
	switch (logo) {
		case 'apollo':
			src = apollo;
			break;
		case 'aws':
			src = aws;
			break;
		case 'cloudinary':
			src = cloudinary;
			break;
		case 'netlify':
			src = netlify;
			break;
		case 'css':
			src = css;
			break;
		case 'express':
			src = express;
			break;
		case 'figma':
			src = figma;
			break;
		case 'gatsby':
			src = gatsby;
			break;
		case 'github':
			src = github;
			break;
		case 'graphql':
			src = graphql;
			break;
		case 'heroku':
			src = heroku;
			break;
		case 'mongodb':
			src = mongodb;
			break;
		case 'node':
			src = node;
			break;
		case 'npm':
			src = npm;
			break;
		case 'sanity':
			src = sanity;
			break;
		case 'stripe':
			src = stripe;
			break;
		case 'vscode':
			src = vscode;
			break;
		case 'wordpress':
			src = wordpress;
			break;
		case 'sass':
			src = sass;
			break;
		case 'html':
			src = html;
			break;
		case 'webflow':
			src = webflow;
			break;
		case 'react':
			src = react;
			break;
		case 'js':
		default:
			src = js;
	}
	return <img src={src} style={{ width, ...style }} alt='Javascript Logo' />;
}
