import React from 'react';

import { updateObj } from '../util/';
import { TextInput, Dropdown } from '../components';
import { TextWrapper } from 'components';

export default function useForm(callback, initialState = {}, options) {
	// --> Incoming Hook Data
	const { onChangeCB, validate = {}, formObject = { panes: [] } } = { ...options };

	// --> Managing Values & Validation Errors
	const [values, setValues] = React.useState(initialState);
	const [validationErrors, setValidationErrors] = React.useState({});

	// --> Without this function, being executed as tabs change, you will not be able to submit because the validation options for the unused panels will stop the submission due to their state
	const [validateIgnoreList, setValidateIgnoreList] = React.useState([]);
	const updateValidationIgnoreList = React.useCallback(async () => {
		let ignoreList = [];
		await formObject.panes.map((panel) =>
			panel.dependsOnPreviousAnswer === true && values[panel.looksAt] !== ''
				? panel.paneOptions.map((option) =>
						values[panel.looksAt] !== option.looksFor
							? Object.entries(option.inputs).map((input) => ignoreList.push(input[0]))
							: null
				  )
				: null
		);
		await setValidateIgnoreList(ignoreList);
		return { ignoreList };
	}, [formObject, values]);

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
			// console.log({ errors });
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
		const { ignoreList } = await updateValidationIgnoreList();

		if (ignoreList) {
			for (let key in validate) {
				if (Object.keys(validate).includes(key)) {
					// The incoming value does not meet validation requirements
					let currValue = checkVals[key];
					if (
						!ignoreList.includes(key) &&
						currValue !== undefined &&
						((Object.keys(validate[key]).includes('min') && currValue.length < validate[key].min) ||
							(Object.keys(validate[key]).includes('exclude') &&
								validate[key].exclude.includes(currValue)) ||
							(Object.keys(validate[key]).includes('notNull') && !currValue) ||
							(Object.keys(validate[key]).includes('max') && currValue.length > validate[key].max))
					) {
						errors[key] = validate[key].errorMsg;
					}
				}
			}

			setValidationErrors(errors);
			return { errors };
		}
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
		(paneData, currData) => {
			let { dependsOnPreviousAnswer, paneOptions: panes, display, looksAt, inputs } = paneData;
			let [renderInputs, text] = [[], null];

			if (dependsOnPreviousAnswer !== undefined) {
				// Check the proper inputs on prev value here
				panes.map((option) => {
					if (option.looksFor === currData[looksAt]) {
						renderInputs = Object.entries(option.inputs);
						display = option.display;
					}
					return null;
				});
			} else {
				renderInputs = Object.entries(inputs);
			}

			if (display !== undefined) {
				let { title, subtext } = display;
				text = (
					<TextWrapper>
						{title && <h1>{title}</h1>}
						{subtext && <p>{subtext}</p>}
					</TextWrapper>
				);
			}

			return (
				<>
					{text}
					{renderInputs.map((input, i) => {
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
