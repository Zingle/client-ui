/**
 * Given a period-delimited path, will fetch that property of an
 * object or return null.  Works around TypeErrors
 */
export default function getNestedObjectProperty(object, propertyPath) {
    const levels = propertyPath.split('.');
    let currentLevel = object;

    for (let x in levels) {
        if (typeof currentLevel[levels[x]] === 'undefined') {
            return null;
        } else {
            currentLevel = currentLevel[levels[x]];
        }
    }
    return currentLevel;
}