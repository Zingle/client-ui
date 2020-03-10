export default function getHyperlinksFromString(str) {
    const linkRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;

    if (!str || typeof str !== 'string') return null;

    return str.match(linkRegex);
}