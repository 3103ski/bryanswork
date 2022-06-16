// Ref Functions
export function refWidth(ref) {
	return !ref || !ref.current || ref.current.clientWidth === undefined ? 0 : ref.current.clientWidth;
}

export function refHeight(ref) {
	return !ref || !ref.current || ref.current.clientWidth === undefined ? 0 : ref.current.clientHeight;
}
