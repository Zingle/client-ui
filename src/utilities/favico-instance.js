import Favico from 'favico.js';
import styleGuide from 'constants/style-guide';

const instance = new Favico({
    animation: 'none',
    bgColor: styleGuide.colors.negative
});

export default instance;