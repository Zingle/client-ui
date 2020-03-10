function sortByProperty(prop) {
    return function(a, b) {
        if (!Object.prototype.hasOwnProperty.call(a, prop) || !Object.prototype.hasOwnProperty.call(b, prop)) return 0;

        const formattedA = a[prop].toLowerCase();
        const formattedB = b[prop].toLowerCase();

        if (formattedA < formattedB) return -1;
        if (formattedA > formattedB) return 1;

        return 0;
    };
}

export default sortByProperty;