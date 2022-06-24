// --> React
import React from 'react';

import {
	js,
	react,
	bootstrap,
	webflow,
	codepen,
	html,
	netlify,
	sass,
	wordpress,
	apollo,
	aws,
	cloudinary,
	css,
	express,
	semanticui,
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
	instagram,
	vscode,
} from './logos';

export function TechLogo({ width = '100%', logo = 'js', style = {} }) {
	let src = js;
	switch (logo) {
		case 'apollo':
			src = apollo;
			break;
		case 'bootstrap':
			src = bootstrap;
			break;
		case 'aws':
			src = aws;
			break;
		case 'cloudinary':
			src = cloudinary;
			break;
		case 'codepen':
			src = codepen;
			break;
		case 'semanticui':
			src = semanticui;
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
		case 'instagram':
			src = instagram;
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
	return <img src={src} style={{ width, ...style }} alt={`${logo}__logo`} />;
}
