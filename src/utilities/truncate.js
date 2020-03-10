function truncate(src, characters, breakOnWord = true) {
    if (src.length > characters) {
        let str = src.substring(0, characters);

        if (breakOnWord === false) {
            let lastSpaceIndex = str.lastIndexOf(' ');

            if (lastSpaceIndex !== -1) {
                str = str.substr(0, lastSpaceIndex);
            }
        } else {
            while (str.charAt(str.length - 1) === ' ') {
                str = str.substr(0, str.length - 1);
            }
        }

        return str + '...';
    }

    return src;
}

export default truncate;