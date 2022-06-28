import React from 'react';
import { updateObj } from '../util/';
import { TextInput, Dropdown } from 'components';

export function useForm(callback, initialState = {}, options) {
	// --> Incoming Hook Data
	const { onChangeCB, validate = {}, formData = { panes: [] } } = { ...options };

	// --> Managing Values & Validation Errors
	const [values, setValues] = React.useState(initialState);
	const [validationErrors, setValidationErrors] = React.useState({});

	// --> Without this function, being executed as tabs change, you will not be able to submit because the validation options for the unused panels will stop the submission due to their state
	const [validateIgnoreList, setValidateIgnoreList] = React.useState([]);
	const updateValidationIgnoreList = React.useCallback(() => {
		let newPasslist = [];

		formData.panes.map((panel) =>
			panel.dependsOnPreviousAnswer === true && values[panel.looksAt] !== ''
				? panel.paneOptions.map((option) =>
						values[panel.looksAt] !== option.looksFor
							? Object.entries(option.inputs).map((input) => newPasslist.push(input[0]))
							: null
				  )
				: null
		);

		return setValidateIgnoreList(newPasslist);
	}, [formData, values]);

	//
	// --------------
	// -> CHECKS <<
	// --------------

	// A utility function that checks a single  key-val pair against the validate option provided to hook
	const keyPassesValidation = React.useCallback(
		(key, value) => {
			if (Object.keys(validate).includes(key) && !validateIgnoreList.includes(key)) {
				if (
					(Object.keys(validate[key]).includes('min') && value.length < validate[key].min) ||
					(Object.keys(validate[key]).includes('exclude') && validate[key].exclude.includes(value)) ||
					(Object.keys(validate[key]).includes('notNull') && !value) ||
					(Object.keys(validate[key]).includes('max') && value.length > validate[key].max)
				) {
					return false;
				}
			}
			return true;
		},
		[validate, validateIgnoreList]
	);

	// -> A function that takes a list of keys as a request to CHECK ALL those values against the validate option
	const validateMultipleValues = React.useCallback(
		(keys) => {
			let errors = {};
			for (let x = 0; x < keys.length; x++) {
				if (!keyPassesValidation(keys[x], values[keys[x]])) {
					errors[keys[x]] = validate[keys[x]].errorMsg;
				}
			}
			setValidationErrors(errors);
		},
		[keyPassesValidation, validate, values]
	);

	// -> A function that checks a SINGLE key-val pair ON KEY STROKE to remove errors when updated
	const checkForAndAssignError = React.useCallback(
		({ key, value }) => {
			// -> A function that adds and removes key messages from error object
			function manageError(errorKey, action) {
				let updatedErrors = { ...validationErrors };
				switch (action) {
					case 'remove':
						delete updatedErrors[errorKey];
						break;
					case 'add':
					default:
						updatedErrors = updateObj(updatedErrors, { [errorKey]: validate[errorKey].errorMsg });
				}
				setValidationErrors(updatedErrors);
			}

			if (!keyPassesValidation(key, value)) {
				return manageError(key, 'add');
			}

			// value key is in error object, but new value passed validation; remove key message
			if (Object.keys(validationErrors).includes(key) || validateIgnoreList.includes(key)) {
				return manageError(key, 'remove');
			}
		},
		[keyPassesValidation, validate, validateIgnoreList, validationErrors]
	);

	// -> Will check if the full form or incoming data matches the provided validate options
	async function formIsValid(incomingCheckData = null) {
		let errors = {};
		let checkVals = incomingCheckData ? incomingCheckData : values;
		for (let key in validate) {
			if (Object.keys(validate).includes(key)) {
				// The incoming value does not meet validation requirements
				if (
					!validateIgnoreList.includes(key) &&
					((Object.keys(validate[key]).includes('min') && checkVals[key].length < validate[key].min) ||
						(Object.keys(validate[key]).includes('exclude') &&
							validate[key].exclude.includes(checkVals[key])) ||
						(Object.keys(validate[key]).includes('notNull') && !checkVals[key]) ||
						(Object.keys(validate[key]).includes('max') && checkVals[key].length > validate[key].max))
				) {
					errors[key] = await validate[key].errorMsg;
				}
			}
		}
		await setValidationErrors(errors);
		return errors;
	}

	// -->  This check is made in useEffect to assist with disabled next/submit buttons
	function panelCheck(keys = []) {
		validateMultipleValues(keys);
	}

	// -----------------
	// -> FORM ACTIONS <<
	// -----------------

	// ==> An onChange function for inputs
	const onChange = React.useCallback(
		(e, { drop = null, set = null }) => {
			if (!drop && !set) {
				checkForAndAssignError({ key: e.target.name, value: e.target.value });
				setValues({ ...values, [e.target.name]: e.target.value });
			}

			if (set) {
				checkForAndAssignError(set);
				setValues({ ...values, [set.key]: set.value });
			}

			if (drop) {
				checkForAndAssignError(drop);
				setValues({ ...values, [drop.key]: drop.value });
			}

			if (onChangeCB) onChangeCB();
		},
		[checkForAndAssignError, onChangeCB, values]
	);

	// ==> An onChange function for drop menus
	const onDropChange = React.useCallback(
		(e, d, key) => {
			onChange(e, { drop: { key, value: d.value } });
		},
		[onChange]
	);

	// ==> A submit function to handle the submitHandler provided to hook
	const onSubmit = async (e) => {
		e.preventDefault();
		return callback();
	};

	// ==> A function that resets the form values
	function resetFormValues() {
		return setValues(initialState);
	}

	// -----------------------
	// --> Component Utility <<
	// -----------------------

	// --> RENDERING INPUTS --> Provide input data model to render form components for a single pane
	const renderInputs = React.useCallback(
		(inputsData, currData) => {
			let inputs = [];
			if (inputsData.dependsOnPreviousAnswer !== undefined) {
				// Check the proper inputs on prev value here
				inputsData.paneOptions.map((option) => {
					if (option.looksFor === currData[inputsData.looksAt]) {
						inputs = Object.entries(option.inputs);
					}
					return null;
				});
			} else {
				inputs = Object.entries(inputsData);
			}
			return (
				<>
					{inputs.map((input, i) => {
						let [key, val] = [input[0], input[1]];
						switch (val.type) {
							case 'dropdown':
								let drop = (
									<Dropdown
										key={`${i}__${key}`}
										placeholder={val.placeholder}
										value={values[key]}
										name={key}
										onChange={(e, d) => onDropChange(e, d, key)}
										options={val.options}
									/>
								);
								return drop;
							case 'text':
							default:
								let text = (
									<TextInput
										key={`${i}__${key}`}
										name={key}
										placeholder={val.placeholder}
										value={values[key]}
										onChange={onChange}
									/>
								);
								return text;
						}
					})}
				</>
			);
		},
		[onChange, onDropChange, values]
	);

	return {
		/**Return Methods */
		setValues,
		onChange,
		onDropChange,
		onSubmit,
		resetFormValues,
		inputHasError: (name) => Object.keys(validationErrors).includes(name),
		formIsValid,
		setValidationErrors,
		initialCheck: checkForAndAssignError,
		panelCheck,
		renderInputs,
		validateIgnoreList,
		updateValidationIgnoreList,

		/**Return States */
		values,
		validationErrors,
		formNotValid: Object.keys(validationErrors).length > 0,
		disableSubmit: Object.keys(validationErrors).length > 0,
	};
}

export function useFormUtility() {
	function getInputs(pane, currValues) {
		let inputs = {};
		if (pane.dependsOnPreviousAnswer === undefined) {
			inputs = { ...pane };
		} else {
			pane.paneOptions.map((option) => {
				if (currValues !== undefined && currValues[pane.looksAt] !== '') {
					if (currValues[pane.looksAt] === option.looksFor) {
						inputs = { ...inputs, ...option.inputs };
					} else {
						Object.keys(option.inputs).map((removableInput) => {
							let newValues = {};
							Object.entries(currValues).map((val) => {
								if (val[0] !== removableInput) {
									newValues[val[0]] = val[1];
								}
								return null;
							});

							return null;
						});
					}
				} else {
					inputs = { ...inputs, ...option.inputs };
				}
				return null;
			});
		}
		return inputs;
	}

	function extractInitialFormData(formData, values) {
		let validate = {};
		let initialState = {};

		formData.map((pane) => {
			let inputs = getInputs(pane, values);
			Object.entries(inputs).map((p) => {
				if (p[1].validate) {
					validate[p[0]] = p[1].validate;
				}
				initialState[p[0]] = p[1].initial;
				return null;
			});
			return null;
		});

		return { validate, initialState };
	}

	function extractCurrentPaneData(pane, values) {
		let validate = {};
		let initialState = {};
		let inputs = getInputs(pane, values);

		Object.entries(inputs).map((input) => {
			let [key, val] = [input[0], input[1]];
			if (val.validate) {
				validate = { ...validate, [key]: val.validate };
			}
			initialState[key] = values[key];
			return null;
		});
		for (let input in inputs) {
			if (inputs[input].validate) {
				validate[input] = inputs[input].validate;
			}
		}

		return { validate, initialState };
	}
	return {
		extractCurrentPaneData,
		extractInitialFormData,
	};
}
