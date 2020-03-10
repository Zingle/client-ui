function getExtensionFromDataURL(dataUrl) {
    return dataUrl.substring('data:image/'.length, dataUrl.indexOf(';base64'));
}

export default getExtensionFromDataURL;