export const optionArray = (arr, text = null) =>
	[{ key: 0, text: text ? `---> ${text}` : 'Select One', value: '' }, ...arr].map((o, i) => ({
		...o,
		key: i + 1,
	}));

export const yesNo = [
	{
		text: 'Yes',
		value: 'yes',
	},
	{
		text: 'No',
		value: 'no',
	},
];

export function updateObj(obj, newData) {
	return {
		...obj,
		...newData,
	};
}
