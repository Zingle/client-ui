export default function getFirstKeyInObject(obj) {
    for (let i in obj) {
        // this is an O(1) way to get the first key in an object,
        // return immediately.
        return i;
    }
}