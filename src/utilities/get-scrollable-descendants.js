const ignoreTags = ['svg', 'path', 'polyline', 'circle', 'line'];

function getScrollableDescendants(rootNode) {
    const results = [];

    function test(node) {
        const isElement = node instanceof HTMLElement;
        const overflowY = isElement && window.getComputedStyle(node).overflowY;
        const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

        if (!node || ignoreTags.includes(node.nodeName)) {
            return null;
        } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
            results.push(node);
        }

        for (let i = 0; i < node.childNodes.length; i++) {
            test(node.childNodes[i]);
        }
    }

    test(rootNode);

    return results;
}

export default getScrollableDescendants;