export default function useFormUtility() {
	function getInputs(pane, currValues) {
		let inputs = {};
		if (pane.dependsOnPreviousAnswer === undefined) {
			inputs = { ...pane.inputs };
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

	function extractInitialFormData(formObject, values) {
		let validate = {};
		let initialState = {};

		formObject.map((pane) => {
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
