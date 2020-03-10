export default function getDelayNom(amount) {
    const hours = Math.floor(amount / 60);
    const minutes = amount % 60;
    let str = ['Send in'];

    if (hours) {
        str.push(`${hours} hr${hours !== 1 ? 's' : ''}`);
    }

    if (minutes) {
        str.push(`${minutes} min${minutes !== 1 ? 's' : ''}`);
    }

    return str.join(' ');
}