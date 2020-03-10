// Determines if the passed element is overflowing its bounds,
// either vertically or horizontally.
// Will temporarily modify the "overflow" style to detect this
// if necessary.
// https://stackoverflow.com/questions/143815/determine-if-an-html-elements-content-overflows
export default function checkOverflow(el) {
    if (!el) return false;

    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === 'visible') {
        el.style.overflow = 'hidden';
    }

    const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
}