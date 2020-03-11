import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import classNames from 'classnames';
import Color from 'color';

Input.propTypes = {
    autocomplete: PropTypes.bool,
    autofocus: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    isBlock: PropTypes.bool,
    className: PropTypes.string,
    didError: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    inputRef: PropTypes.func,
    maxLength: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onPaste: PropTypes.func,
    placeholder: PropTypes.string,
    showQASpecificAttributes: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    style: PropTypes.object,
    styleModifier: PropTypes.oneOf(['default', 'underlined', 'live']),
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf(['text', 'email', 'number', 'search', 'time', 'password', 'textarea']),
    value: PropTypes.any.isRequired,
};

Input.defaultProps = {
    autocomplete: false,
    autofocus: false,
    align: 'left',
    isBlock: true,
    className: '',
    didError: false,
    inputRef: () => {},
    isDisabled: false,
    showQASpecificAttributes: true,
    styleModifier: 'default',
    tabIndex: 0,
    type: 'text',
};

function Input(props) {
    const inputStyles = css([
        styles.base,
        props.styleModifier === 'default' && styles.default,
        props.styleModifier === 'underlined' && styles.underlined,
        props.styleModifier === 'live' && styles.live,
        props.type === 'textarea' && styles.textarea,
        props.size === 'large' && styles.large,
        props.size === 'small' && styles.small,
        props.align === 'center' && styles.center,
        props.isBlock === false && styles.inline,
        props.didError && styles.error,
    ]);
    const mergedStyles = classNames(inputStyles, props.className);
    const Element = (props.type === 'textarea' ? 'textarea' : 'input');

    return (
        <Element
            autoComplete={props.autocomplete ? 'on' : (props.type === 'password' ? 'new-password' : 'off')}
            autoFocus={props.autofocus}
            className={mergedStyles}
            data-gramm="false"
            disabled={props.isDisabled}
            id={props.id}
            max={props.max ? props.max : undefined}
            maxLength={props.maxLength ? props.maxLength : undefined}
            min={props.min ? props.min : undefined}
            name={props.name}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onKeyDown={props.onKeyDown}
            onPaste={props.onPaste}
            placeholder={props.placeholder}
            qa-value={props.showQASpecificAttributes ? props.value : null}
            ref={props.inputRef}
            style={props.style}
            tabIndex={props.tabIndex}
            type={props.type}
            value={props.value}
        />
    );
}

export const styles = StyleSheet.create({
    base: {
        boxSizing: 'border-box',
        lineHeight: 'normal',
        width: '100%',
        ':focus': {
            boxShadow: 'none',
            outline: 'none'
        }
    },
    center: {
        textAlign: 'center'
    },
    default: {
        backgroundColor: 'white',
        borderRadius: '4px',
        border: `1px solid ${styleGuide.colors.light}`,
        padding: '9px 11px',
        fontWeight: 500,
        resize: 'none',
        ':focus': {
            borderColor: styleGuide.colors.primary
        },
        '::placeholder': {
            color: styleGuide.colors.textLight
        }
    },
    error: {
        borderColor: styleGuide.colors.negative,
        ':focus': {
            borderColor: styleGuide.colors.negative
        }
    },
    inline: {
        display: 'inline-block',
        width: 'auto'
    },
    large: {
        padding: '16px',
        fontSize: '1.2rem',
        fontWeight: '600',
        borderWidth: '2px'
    },
    live: {
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        display: 'inline-block',
        border: '1px solid transparent',
        fontSize: '1em',
        borderRadius: '3px',
        color: styleGuide.colors.primary,
        lineHeight: 1.6,
        padding: '2px 8px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ':hover:not(:focus):not(:disabled)': {
            borderColor: styleGuide.colors.light
        },
        ':focus': {
            color: styleGuide.colors.primary,
            borderColor: styleGuide.colors.primary,
            backgroundColor: Color(styleGuide.colors.primary).lighten(0.9).toString()
        },
        '::placeholder': {
            color: Color(styleGuide.colors.primary).lighten(0.65).toString()
        }
    },
    small: {
        padding: '7px 9px',
        fontSize: '0.9em'
    },
    textarea: {
        padding: '12px',
        minHeight: '75px'
    },
    underlined: new Map([
        // we use a Map to guarantee css property order
        // since this declaration has overwriting properties
        ['fontSize', '2.57rem'],
        ['fontWeight', '600'],
        ['color', 'white'],
        ['border', 'none'],
        ['backgroundColor', 'transparent'],
        ['borderRadius', '0'],
        ['borderColor', 'none'],
        ['paddingLeft', '0'],
        ['borderBottom', '2px solid transparent'],
        [':focus', {
            'borderColor': 'white'
        }],
        ['::placeholder', {
            'color': 'rgba(255, 255, 255, 0.5)'
        }],
        ['@media (max-width: 700px)', {
            'fontSize': '2rem'
        }]
    ])
});

export default Input;