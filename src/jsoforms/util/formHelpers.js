import { optionArray, yesNo } from './generics.js';

export const yesNoQuestion = (question) => {
	return {
		placeholder: question,
		type: 'dropdown',
		options: optionArray(yesNo, question),
		initial: '',
		validate: {
			min: 1,
			errorMsg: 'Please select yes or no',
		},
	};
};

export const simpleDropMenu = ({
	options,
	placeholder = 'select an option',
	errorMsg = 'please select one',
	validate = true,
	customValidation = null,
	initial = '',
}) => {
	let defaultValidation = {
		min: 1,
		errorMsg,
	};

	let configuredOptions = options.map((option) => {
		if (typeof option === 'string') {
			let value = option.toLocaleLowerCase().split(' ').join('');
			return {
				text: option,
				value: value.length > 10 ? option : value,
			};
		}

		if (typeof option === 'object') return option;
		return null;
	});

	return {
		placeholder,
		type: 'dropdown',
		initial,
		validate: validate === false ? null : customValidation ? customValidation : defaultValidation,
		options: optionArray(configuredOptions, placeholder),
	};
};

export const textInput = ({
	placeholder = 'Input here',
	validate = true,
	errorMsg = 'please answer',
	customValidation = null,
}) => {
	let defaultValidation = {
		min: 1,
		errorMsg,
	};
	return {
		type: 'text',
		initial: '',
		placeholder,
		validate: validate === false ? null : customValidation ? customValidation : defaultValidation,
	};
};

export const provideRating = ({ placeholder, maxRating = 10 }) => {
	const ratings = [...Array(maxRating).keys()].map((r) => `${r + 1}`);
	return simpleDropMenu({ options: ratings, placeholder });
};
