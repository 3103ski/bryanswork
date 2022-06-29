// --> React
import React from 'react';

// --> Packages
import { Modal as SUIModal, Header } from 'semantic-ui-react';

// --> Component Imports
import Style from './modal.module.scss';
import './modal.module.scss';

export default function Modal({ title, isOpen, callback, children }) {
	return (
		<SUIModal className={Style.Modal} dimmer='blurring' closeIcon open={isOpen} onClose={() => callback(false)}>
			<Header className={Style.Header}>{<h1 className={Style.Title}>{title}</h1>}</Header>
			<SUIModal.Content className={Style.ContentWrapper}>
				<div className={Style.Inner}>{children}</div>
			</SUIModal.Content>
		</SUIModal>
	);
}
