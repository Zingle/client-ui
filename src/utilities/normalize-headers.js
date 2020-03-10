export default function normalizeHeaders(headers, rows) {
    let count = headers.length || 0;
    const arr = [...headers];

    rows.forEach(row => {
        if (row.length > count) {
            count = row.length;
        }
    });

    while (arr.length < count) {
        arr.push(' ');
    }

    return arr;
}