export default function getFileNameFromHeader(disposition) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    let matches = filenameRegex.exec(disposition);

    if (matches !== null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
    }
}