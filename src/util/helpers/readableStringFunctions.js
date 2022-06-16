/**
 *
 *      Just a simple string lib of things common checks that
 *      look better inline as a readable function name.
 *
 */

export const hasSpace = (s) => s.includes(' ');
export const startsNumerical = (d) => !isNaN(d[0]);
export const isGreaterThan = (n, d) => d.length > n;
export const isLessThan = (n, d) => d.length < n;
export const containsANumber = (s) => /.*\d/.test(s);
export const hasAtLeastOneCap = (s) => /.*[A-Z]/.test(s);
export const hasAtLeastOneLower = (s) => /.*[a-z]/.test(s);
export const hasAtLeastOneCharacter = (s) => /.*\W/.test(s);

export function randomNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function intFromPx(string) {
	return parseInt(string.split('px')[0]);
}
