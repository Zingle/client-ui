import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from '../style';

class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isDisabled: PropTypes.bool,
        items: PropTypes.arrayOf(PropTypes.shape({
            displayName: PropTypes.string,
            value: PropTypes.string
        })),
        namespace: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string
    }

    static defaultProps = {
        isDisabled: false
    }

    handleClick = value => () => {
        this.props.onChange(value);
    }

    render() {
        return (
            <div className={css(styles.base)}>
                {this.props.items.map(item => (
                    <button
                        className={css(
                            styles.button,
                            item.value === this.props.value && styles.active,
                            this.props.isDisabled && styles.disabled
                        )}
                        disabled={this.props.isDisabled}
                        key={item.value}
                        onClick={this.handleClick(item.value)}
                    >
                        {item.displayName}
                    </button>
                ))}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        flex: '1 1 auto',
        backgroundColor: 'white',
        fontSize: '13px',
        fontWeight: 600,
        boxSizing: 'border-box',
        padding: '7px 0px',
        border: `1px solid ${styleGuide.colors.light}`,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: styleGuide.colors.faint
        },
        ':first-child': {
            borderRadius: '3px 0px 0px 3px'
        },
        ':last-child': {
            borderRadius: '0px 3px 3px 0px'
        }
    },
    active: {
        borderColor: styleGuide.colors.primary,
        color: styleGuide.colors.primary,
        backgroundColor: `${styleGuide.colors.primaryLight} !important`
    },
    disabled: {
        opacity: 0.5
    }
});

export default ButtonGroup;