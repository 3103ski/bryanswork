// --> React
import React from 'react';

// --> Packages
import { Form } from 'semantic-ui-react';

// --> Project Imports
import { Button, Loading } from 'components';
import { useForm, useFormUtility } from '../hooks';

//--> Component Imports
import Style from './formGenerator.module.scss';
// import { formObject } from '../../sections/survey_formSection/formPanelsData.js';

export default function FormGenerator({ formObject, callback }) {
	// Track current location in the form
	const [activePanel, setActivePanel] = React.useState(0);

	// Used to calc width for panes and margin calcs
	const [formWidth, setFormWidth] = React.useState(null);
	const formRef = React.createRef();
	const sidePad = 25;

	/**
	 * TODO: Figure out tab button issue
	 *
	 * A user on the form can click tab button all the way to the end of the form and try to submit it.
	 * This even sometimes breaks the UI.
	 */

	// --> Extract form data using utility functions from hook
	const { extractInitialFormData } = useFormUtility();
	const { validate, initialState } = extractInitialFormData(formObject.panes);

	// --> Setup the hook for the entire form (single or multi pane)
	const { onSubmit, formIsValid, setValues, values, updateValidationIgnoreList } = useForm(
		handleOnSubmit,
		initialState,
		{ validate, formObject }
	);

	// --> A function that will accept the final (or only) pane's data, merge it with all collected so far, and pass it into api callback
	async function handleOnSubmit(finalData) {
		const payload = { ...values, ...finalData };
		await setValues(payload);

		const { errors } = await formIsValid(payload);

		if (Object.keys(errors).length === 0) {
			for (let key in payload) {
				if (payload[key] === '') delete payload[key];
			}
			callback(payload);
		}
	}

	// --> A function that will fire every time a multi-pane form goes back OR forth
	function handleFormNavigation(panelIndex = null, newVals) {
		setValues({ ...values, ...newVals });
		updateValidationIgnoreList();

		if (panelIndex !== null) {
			setActivePanel(panelIndex);
			return true;
		}
	}

	//______________________________________________________________________
	// ==> Needed to render correct panels but offset transition margin when switching
	//----------------------------------------------------------------------
	// ==> used to help component offset correctly and tells JSX code in return which panels should not be considered.
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

	// ==> Will decide if a conditional panal should be shown (panel with `dependsOnPreviousAnswer` set to true)
	function showPanel(panel) {
		if (panel.dependsOnPreviousAnswer !== undefined && panel.dependsOnPreviousAnswer) {
			// Grab the value the pane depends on
			let focusValue = values[panel.looksAt];

			// Check if the value has an answer
			if (focusValue !== '') {
				// These are answers that the form data have provided pane data for, if we have any answer that is not on this list, we will pass that value to validation for payload, but there will be no panel rendered.
				let answersToShowFor = panel.paneOptions.map((p) => p.looksFor);

				// Does the answers list (our pane inventory) include something for the value we have?
				if (answersToShowFor.includes(focusValue)) {
					// We found that it does, is the pane on removal list from previous answers?
					if (removedPanes.includes(panel.removalLabel)) {
						// If it was, remove it.
						managePaneRemoval(panel.removalLabel, 'remove');
					}
					// With the removedPanes array confirmed up to date, we should now render this pane.
					return true;
				} else {
					// The answer us NOT something we have a pane for
					if (!removedPanes.includes(panel.removalLabel)) {
						// make sure we add the panel title to
						managePaneRemoval(panel.removalLabel, 'add');
					}
					return false;
				}
			} else {
				// The pane should not be rendered yet because the focus value has no answer yet
				return false;
			}
		}
		// Does not depend on previous answer, bring the pane.
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
		window.addEventListener('resize', calcWidth);
		return () => window.removeEventListener('resize', calcWidth);
	}, [calcWidth]);
	console.log(formWidth);

	return (
		<Form onSubmit={onSubmit} className={Style.MultiPageForm}>
			<div style={{ width: '100%' }} ref={formRef} className={Style.FormOuter}>
				{!formWidth ? (
					<Loading />
				) : (
					<div
						className={Style.FormInner}
						style={{
							width: `${formWidth * (formObject.panes.length + 1)}px`,
							marginLeft: `-${activePanel * formWidth}px`,
						}}>
						{formObject.panes
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
									isFinal={i === formObject.panes.length - removedPanes.length - 1 ? true : null}
									submitText={formObject.submitText ? formObject.submitText : 'Submit'}
									paneButtonCallback={handleFormNavigation}
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
	submitText,
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
						{submitText}
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
