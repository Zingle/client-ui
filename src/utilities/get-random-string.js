export default function getRandomString() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
}
