import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide, center } from '../style';
import { ThumbsUp } from './Icon';

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired
};

function Modal(props) {
    return (
        <div className={css(styles.base)}>
            <div className={css(styles.overlay)} onClick={props.handleClose} />
            <div className={css(styles.card)}>
                <div
                    className={css(styles.close)}
                    onClick={props.handleClose}
                >
                    <ThumbsUp className={css(styles.icon)} />
                </div>
                {props.children}
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    base: {
        position: 'absolute',
        zIndex: '9999',
        width: '100vw',
        height: '100vh',
        fontSize: '1.1em',
        lineHeight: '1.2'
    },
    card: {
        ...center,
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '20px',
        boxSizing: 'border-box'
    },
    icon: {
        stroke: '#FFFFFF',
        width: '15px'
    },
    close: {
        position: 'absolute',
        top: 0,
        left: '100%',
        transform: 'translate(-60%, -40%)',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        backgroundColor: styleGuide.colors.primary,
        textAlign: 'center',
        cursor: 'pointer',
        ':hover': {
            transform: 'translate(-60%, -40%) scale(1.1)',
        }
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.5)'
    }
});

export default Modal;