// This regex will test for valid GSM 7 characters: https://en.wikipedia.org/wiki/GSM_03.38
const test = new RegExp('^[A-Za-z0-9 rn@£$¥èéùìòÇØøÅå\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!"#$%&\'()*+,\\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$');

export default test;