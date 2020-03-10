import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from '../style';
import Color from 'color';

AnimatedEllipsis.propTypes = {
    modifier: PropTypes.oneOf(['default', 'note'])
};

AnimatedEllipsis.defaultProps = {
    modifier: 'default'
};

function AnimatedEllipsis(props) {
    return (
        <div className={css(styles.base)}>
            {[0, 1, 2].map(n => (
                <div
                    className={css(
                        styles.dot,
                        props.modifier === 'default' && styles.default,
                        props.modifier === 'note' && styles.note
                    )}
                    key={n}
                />
            ))}
        </div>
    );
}

const pulseAnimation = {
    '0%, 60%, 100%': {
        opacity: 0
    },
    '33%': {
        opacity: 1
    }
};

const styles = StyleSheet.create({
    base: {

    },
    dot: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        animationName: pulseAnimation,
        animationDuration: '.8s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        ':nth-child(2)': {
            animationDelay: '-0.7s'
        },
        ':nth-child(3)': {
            animationDelay: '-0.6s'
        },
        ':not(:last-child)': {
            marginRight: '4px'
        }
    },
    default: {
        backgroundColor: 'white',
    },
    note: {
        backgroundColor: Color(styleGuide.colors.noteYellow).darken(0.4).toString()
    }
});

export default AnimatedEllipsis;