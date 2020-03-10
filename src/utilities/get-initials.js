const titles = [
    'Mr',
    'Mrs',
    'Ms',
    'Mx',
    'Dr',
    'Prof',
    'Dir',
    'Rev',
    'Capt'
];

export default function getInitials(title) {
    if (!title) return '';
    const match = title.match(/\b(\w+)\b/g);
    const parts = match ? match.filter(part => !titles.includes(part)).join(' ') : '';

    let initials = parts.match(/\b\w/g) || [];

    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    return initials;
}