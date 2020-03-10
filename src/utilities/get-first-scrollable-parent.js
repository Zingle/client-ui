// https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775
function getFirstScrollableParent(node) {
    const isElement = node instanceof HTMLElement;
    const overflowY = isElement && window.getComputedStyle(node).overflowY;
    const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

    if (!node) {
        return null;
    } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
        return node;
    }

    return getFirstScrollableParent(node.parentNode) || document.body;
}

export default getFirstScrollableParent;