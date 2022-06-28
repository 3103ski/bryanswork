// --> React
import React from 'react';

// --> Packages
import { Form } from 'semantic-ui-react';

// --> Project Imports
import { Button, Loading } from 'components';
import { useForm, useFormUtility } from 'hooks';

//--> Component Imports
import Style from './projectSurvey.module.scss';
import { formData } from './formPanelsData.js';

export default function FormGenerator() {
	const [activePanel, setActivePanel] = React.useState(0);
	const [formWidth, setFormWidth] = React.useState(null);
	const formRef = React.createRef();
	const sidePad = 25;

	// --> Extract form data using utility functions from hook
	const { extractInitialFormData } = useFormUtility();
	const { validate, initialState } = extractInitialFormData(formData.panes);

	// --> Setup the hook for the entire form (single or multi pane)
	const { onSubmit, formIsValid, setValues, values, updateValidationIgnoreList } = useForm(
		handleOnSubmit,
		initialState,
		{ validate, formData }
	);

	// --> A function that will fire every time a multi-pane form goes back OR forth
	function handlePanelButtonOnClick(panelIndex = null, newVals) {
		setValues({ ...values, ...newVals });
		updateValidationIgnoreList();

		if (panelIndex !== null) {
			setActivePanel(panelIndex);
			return true;
		}
	}

	// --> A function that will accept the final (or only) pane's data, merge it with all collected so far, and pass it into api callback
	async function handleOnSubmit(finalData) {
		const payload = { ...values, ...finalData };
		let contentSet = await handlePanelButtonOnClick(null, finalData);

		let errors = await formIsValid(payload);

		if (Object.keys(errors).length === 0 && !contentSet) {
			console.log({ payload });
			// Fire submit function to API
		}
	}

	//______________________________________________________________________
	// ==> Needed to render correct panels but offset transition margin when switching
	//----------------------------------------------------------------------
	const [removedPanes, setRemovedPanes] = React.useState([]);
	const managePaneRemoval = async (pane, operation) => {
		switch (operation) {
			case 'remove':
				let updated = removedPanes.filter((p) => p !== pane);
				await setRemovedPanes(updated);
				break;
			case 'add':
				await setRemovedPanes([...removedPanes, pane]);
				break;
			default:
				break;
		}
	};

	function showPanel(panel) {
		if (panel.dependsOnPreviousAnswer !== undefined) {
			let focusValue = values[panel.looksAt];
			if (focusValue !== '') {
				let answersToShowFor = panel.paneOptions.map((p) => p.looksFor);
				if (answersToShowFor.includes(focusValue)) {
					if (removedPanes.includes(panel.title)) {
						managePaneRemoval(panel.title, 'remove');
					}
					return true;
				} else {
					if (!removedPanes.includes(panel.title)) {
						managePaneRemoval(panel.title, 'add');
					}
					return false;
				}
			}
		}
		return true;
	}

	//______________________________________________________________________
	// ==> Uses the ref of outer to dictate width for all form panes inside
	//----------------------------------------------------------------------
	const calcWidth = React.useCallback(() => {
		if (formRef.current) {
			let width = formRef.current.getBoundingClientRect().width;
			if (!formWidth || formWidth !== width) {
				setFormWidth(width);
			}
		}
	}, [formRef, formWidth]);

	React.useEffect(() => {
		calcWidth();
	}, [calcWidth]);

	return (
		<Form onSubmit={onSubmit} className={Style.MultiPageForm}>
			<div style={{ width: '100%' }} ref={formRef} className={Style.FormOuter}>
				{!formWidth ? (
					<Loading />
				) : (
					<div
						className={Style.FormInner}
						style={{
							width: `${formWidth * formData.panes.length}px`,
							marginLeft: `-${activePanel * formWidth}px`,
						}}>
						{formData.panes
							.map((pane) => (showPanel(pane) ? pane : null))
							.filter((p) => p !== null)
							.map((panel, i) => (
								<FormPanel
									panel={panel}
									prevIndex={i - 1}
									nextIndex={i + 1}
									onSubmitCallback={handleOnSubmit}
									values={values}
									setValues={setValues}
									isFinal={i === formData.panes.length - removedPanes.length - 1 ? true : null}
									paneButtonCallback={handlePanelButtonOnClick}
									key={`${Math.random()}__${i}`}
									style={{ width: `${formWidth}px`, padding: `20px ${sidePad}px` }}
								/>
							))}
					</div>
				)}
			</div>
		</Form>
	);
}

const FormPanel = ({
	panel,
	paneButtonCallback,
	prevIndex,
	nextIndex,
	setValues,
	values,
	finalText = 'send',
	onSubmitCallback,
	isFinal,
	...rest
}) => {
	// --> Setup Panel Data
	const [initialCheckDone, setInitialCheckDone] = React.useState(false);
	const { extractCurrentPaneData } = useFormUtility();

	const { validate, initialState } = extractCurrentPaneData(panel, values);

	const options = { validate };

	// --> Setup Hook For Panel
	const {
		panelCheck,
		renderInputs,
		values: panelValues,
		disableSubmit: disableNextButton,
	} = useForm(null, initialState, options);

	React.useEffect(() => {
		// Every time the pane loads, check the validation so the proceed button will disable if needed
		if (!initialCheckDone && validate) {
			panelCheck(Object.keys(validate));
			setInitialCheckDone(true);
		}
	}, [initialCheckDone, panelCheck, validate]);

	return (
		<div {...rest}>
			{renderInputs(panel, values)}
			<div className={Style.ButtonWrapper}>
				{prevIndex >= 0 ? (
					<Button thin onClick={() => paneButtonCallback(prevIndex, panelValues)}>
						Back
					</Button>
				) : null}
				{isFinal ? (
					<Button disabled={disableNextButton} thin onClick={() => onSubmitCallback(panelValues)}>
						Send Survey
					</Button>
				) : (
					<Button
						disabled={disableNextButton}
						thin
						onClick={() => paneButtonCallback(nextIndex, panelValues)}>
						Next
					</Button>
				)}
			</div>
		</div>
	);
};
