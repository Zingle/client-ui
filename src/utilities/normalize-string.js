// Trims, casts to lowercase, and removes all whitespace
function normalizeString(str) {
    return str.trim().replace(/ /g, '').toLowerCase();
}

export default normalizeString;