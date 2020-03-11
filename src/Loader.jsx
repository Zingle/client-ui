import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import classNames from 'classnames';

Loader.propTypes = {
    className: PropTypes.string,
    modifier: PropTypes.oneOf(['white', 'mixed', 'default', 'translations']),
    size: PropTypes.oneOf(['tiny', 'small', 'default', 'large']),
    type: PropTypes.oneOf(['spinner', 'dots']),
};

Loader.defaultProps = {
    modifier: 'default',
    size: 'default',
    type: 'spinner'
};

function Loader(props) {
    const loaderStyles = classNames(
        css(
            props.type === 'spinner' && styles.spinner,
            props.modifier === 'white' && styles.white,
            props.modifier === 'mixed' && styles.mixed,
            props.size === 'small' && styles.small,
            props.size === 'large' && styles.large,
            props.size === 'tiny' && styles.tiny,
            props.modifier === 'translations' && styles.translations
        ),
        props.className
    );

    return <div className={loaderStyles}></div>;
}

const spinKeyframes = {
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
};

const styles = StyleSheet.create({
    spinner: {
        display: 'inline-block',
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,.15)',
        borderTopColor: styleGuide.colors.primary,
        animationName: spinKeyframes,
        animationDuration: '.5s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear'
    },
    small: {
        width: '10px',
        height: '10px'
    },
    large: {
        width: '25px',
        height: '25px'
    },
    white: {
        borderColor: styleGuide.colors.primary,
        borderTopColor: 'white'
    },
    translations: {
        borderColor: styleGuide.colors.translations,
        borderTopColor: 'white'
    },
    mixed: {
        borderTopColor: 'white',
    },
    tiny: {
        width: '7px',
        height: '7px'
    }
});

export default Loader;