export function windowData() {
	let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	let width = window.innerWidth;
	let height = window.innerHeight;
	return {
		winScroll,
		width,
		height,
	};
}

// export function breakpointWidth() {

// }
