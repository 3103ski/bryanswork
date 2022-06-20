import Style from '../sass/index.scss';
import { intFromPx } from 'util';

export const isMobile = () => window.innerWidth < Style.bp_tablet;
export const isTablet = () => window.innerWidth >= Style.bp_tablet && window.innerWidth < Style.bp_computer;
export const isCpu = () => window.innerWidth >= Style.bp_computer && window.innerWidth < Style.bp_widerscreen;
export const isWidescreen = () => window.innerWidth > Style.bp_widerscreen;

export const screenSize = () => {
	let width = window.innerWidth;

	let tabletWidth = intFromPx(Style.bp_tablet);
	let cpuWidth = intFromPx(Style.bp_computer);
	let wideWidth = intFromPx(Style.bp_widescreen);

	if (width < tabletWidth) {
		return 'mobile';
	}

	if (width >= tabletWidth && width < cpuWidth) {
		return 'tablet';
	}

	if (width >= cpuWidth && width < wideWidth) {
		return 'cpu';
	}

	if (width > wideWidth) {
		return 'widescreen';
	}
};
