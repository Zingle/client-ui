export default function descendantSelectors(selector, baseSelector, generateSubtreeStyles) {
    if (selector[0] !== '&') {
        return null;
    }

    const newSelector = selector.replace('&', baseSelector);

    return generateSubtreeStyles(newSelector);
}