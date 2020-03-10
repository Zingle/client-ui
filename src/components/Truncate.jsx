import PropTypes from 'prop-types';
import truncate from '../utilities/truncate';

Truncate.propTypes = {
    breakOnWord: PropTypes.bool,
    characters: PropTypes.number.isRequired
};

Truncate.defaultProps = {
    breakOnWord: true
};

function Truncate(props) {
    if (props.characters <= 0) return '';
    if (typeof props.children !== 'string') return props.children;

    return truncate(props.children, props.characters, props.breakOnWord);
}

export default Truncate;
