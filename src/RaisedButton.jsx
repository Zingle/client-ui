import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import classNames from 'classnames';

RaisedButton.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.func.isRequired, // this should be a react SVG element
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

function RaisedButton(props) {
    const Icon = props.icon;

    return (
        <div
            className={classNames(css(styles.base), props.className)}
            id={props.id}
            onClick={props.onClick}
        >
            <Icon className={css(styles.icon)} />
        </div>
    );
}

const styles = StyleSheet.create({
    base: {
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 0 rgba(0,0,0,0.18)',
        zIndex: 1,
        border: 'none',
        cursor: 'pointer'
    },
    icon: {
        color: styleGuide.colors.textMedium,
        width: '20px',
        height: '20px'
    }
});

export default RaisedButton;