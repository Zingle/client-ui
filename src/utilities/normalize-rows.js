export default function normalizeRows(rows, headers) {
    let count = headers.length || 0;
    const arr = [...rows];

    arr.forEach(row => {
        if (row.length > count) {
            count = row.length;
        }
    });

    arr.forEach(row => {
        while (row.length < count) {
            row.push(' ');
        }
    });

    return arr;
}