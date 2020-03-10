function isElementScrollable(elem) {
    return elem.scrollHeight > elem.clientHeight;
}

export default isElementScrollable;